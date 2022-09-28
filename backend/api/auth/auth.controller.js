const bcrypt = require('bcrypt')
const dbService = require('../../services/db.service')

module.exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const collection = await dbService.getCollection('users')

        const usernameCheck = await collection.findOne({ username: username })
        if (usernameCheck) {
            return res.json({ msg: "Username already taken", status: false })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await collection.insertOne({
            username,
            password: hashedPassword,
            score: 0,
            results: []
        })
        delete user.password
        console.log('login success')
        return res.json({ status: true, user })
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
            return res.json({ msg: "Incorrect Username or Password", status: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ msg: "Incorrect Username or Password", status: false });
        }
        delete user.password;
        return res.json({ status: true, user });

    } catch (err) {
        console.log(err)
    }
};
