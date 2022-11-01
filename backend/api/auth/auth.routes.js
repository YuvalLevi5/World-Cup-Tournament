const { register, login, updateUser, getUsers , getCurrUser} = require("./auth.controller")
const router = require("express").Router();

router.get("/", getUsers)
router.get("/:username", getCurrUser)
router.post("/register", register)
router.post("/login", login)
router.put("/:id", updateUser)

module.exports = router;