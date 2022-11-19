const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const Cryptr = require('cryptr')
const cryptr = new Cryptr('yuvallevi5')

module.exports.register = async (req, res, next) => {
    try {
        const { username, password, secretAns } = req.body
        const collection = await dbService.getCollection('users')

        const usernameCheck = await collection.findOne({ username: username })
        if (usernameCheck) {
            return res.json({ msg: "Username already taken", status: false })
        }

        const hashedPassword = await cryptr.encrypt(password)
        const user = await collection.insertOne({
            username,
            secretAns,
            password: hashedPassword,
            score: 0,
            gsc: 0,
            wcw: 0,
            ts: 0,
            results: []

        })
        delete user.password
        const sendUser = await collection.findOne({ username: username })
        return res.json({ status: true, user: sendUser })
    } catch (error) {
        next(ex)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ username: username })
        if (!user) {
            return res.json({ msg: "Incorrect Username or Password", status: false })
        }
        const passwordFromDb = await cryptr.decrypt(user.password)

        const isPasswordValid = passwordFromDb === password ? true : false
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            return res.json({ msg: "Incorrect Username or Password", status: false })
        }
        delete user.password
        return res.json({ status: true, user })

    } catch (err) {
        console.log(err)
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const user = req.body
        const collection = await dbService.getCollection('users')
        const updatedUser = {
            ...user,
            _id: toObjectId(user._id)
        }

        const afterUpdateUser = await collection.updateOne({ _id: updatedUser._id }, { $set: updatedUser })
        return res.json({ status: true, user: updatedUser })
    } catch (err) {
        console.log(err)
    }
}

module.exports.getUsers = async (req, res, next) => {
    try {
        const collection = await dbService.getCollection('users')
        const users = await collection.find({}).toArray()
        res.json(users)
    } catch (err) {
        console.log(err)
    }
}

module.exports.getCurrUser = async (req, res, next) => {
    try {
        const username = req.params.username
        const collection = await dbService.getCollection('users')
        const usernameCheck = await collection.findOne({ username: username })
        delete usernameCheck.password
        res.json(usernameCheck)
    } catch (err) {
        console.log(err)
    }
}

module.exports.getCurrUserForResetPass = async (req, res, next) => {
    try {
        const username = req.params.username
        console.log(username)
        const collection = await dbService.getCollection('users')
        const usernameCheck = await collection.findOne({ username: username })
        console.log(usernameCheck)
        const password = await cryptr.decrypt(usernameCheck.password)
        usernameCheck.password = password
        res.json(usernameCheck)
    } catch (err) {
        console.log(err)
    }
}

function toObjectId(id) {
    return new ObjectId(id)
}