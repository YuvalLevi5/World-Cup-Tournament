const { getGames, updateGame} = require("./games.controller")
const router = require("express").Router();

router.get('/', getGames)
router.put('/:gameName', updateGame)

module.exports = router;