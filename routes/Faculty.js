const express = require("express");
const checkAuth = require("../middlewares/checkAuth");
const { addFaculty, assignSubject, getFacultyProfile, getAllFaculty } = require("../controllers/Faculty");
const router = express.Router();

router.post("/new", checkAuth, addFaculty)
router.post("/assign", checkAuth, assignSubject)
router.get("/:id", getFacultyProfile)
router.get("/", getAllFaculty)
module.exports = router;