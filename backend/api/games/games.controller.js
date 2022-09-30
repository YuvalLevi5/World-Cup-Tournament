const dbService = require('../../services/db.service')



module.exports.getGames = async (req, res, next) => {
    try {
        const collection = await dbService.getCollection('games')
        const games = await collection.find({}).toArray()
        return res.json(games);
    } catch (err) {
        console.log(err)
    }
};