const express = require("express");
const checkAuth = require("../middlewares/checkAuth");
const { addSubject, deleteSubject, getAllSubject } = require("../controllers/Subject");
const router = express.Router();

router.post("/new", checkAuth, addSubject)
router.delete("/:id", checkAuth, deleteSubject)
router.get("/all", getAllSubject)
module.exports = router