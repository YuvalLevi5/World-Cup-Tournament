const { getGames} = require("./games.controller")
const router = require("express").Router();

router.get('/', getGames)

module.exports = router;