const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId;


module.exports.getGames = async (req, res, next) => {
    try {
        const collection = await dbService.getCollection('games')
        const games = await collection.find({}).toArray()
        return res.json(games);
    } catch (err) {
        console.log(err)
    }
};

module.exports.updateGame = async (req, res, next) => {
    try {
        const score = req.body
        const collection = await dbService.getCollection('games')
        const currGame = await collection.findOne({ name: score.gameName })
        console.log(currGame)
        const updateGame = {
            ...currGame,
            winner: score.winner,
            teamOneGoals: score.teamOneGoals,
            teamTwoGoals: score.teamTwoGoals,
        }
        await collection.updateOne({ _id: updateGame._id }, { $set: updateGame })
        return res.json(updateGame);
    } catch (err) {
        console.log(err)
    }
};



function toObjectId(id) {
    return new ObjectId(id)
}