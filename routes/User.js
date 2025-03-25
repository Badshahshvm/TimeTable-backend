const express = require("express");
const { register, login } = require("../controllers/User");
const router = express.Router()

router.post("/new", register)
router.post("/auth", login)
module.exports = router