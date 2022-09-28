const { register, login, updateUser } = require("./auth.controller")
const router = require("express").Router();

router.post("/register", register)
router.post("/login", login)
router.put("/:id", updateUser)

module.exports = router;