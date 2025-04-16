const express = require("express");
const checkAuth = require("../middlewares/checkAuth");
const { addTimeTable, getAllTimetable } = require("../controllers/Timetable");

const router = express.Router()

router.post("/new", checkAuth, addTimeTable)
router.get("/all", getAllTimetable)

module.exports = router;
