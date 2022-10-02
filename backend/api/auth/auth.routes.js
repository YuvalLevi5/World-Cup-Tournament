const { register, login, updateUser, getUsers } = require("./auth.controller")
const router = require("express").Router();

router.get("/", getUsers)
router.post("/register", register)
router.post("/login", login)
router.put("/:id", updateUser)

module.exports = router;