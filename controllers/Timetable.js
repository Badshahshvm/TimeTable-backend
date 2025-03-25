const userModel = require("../models/Users");
const Subject = require("../models/Subject");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Faculty = require("../models/Assigned")
const Timetable = require("../models/Timetable")


const addTimeTable = async (req, res) => {
              try {

              }
              catch (err) {
                            res.josn({
                                          success: false,
                                          message: err.message
                            })
              }
}


const viewTimetable = async (req, res) => {
              try {

              }
              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })
              }
}



const deleteTimetable = async (req, res) => {
              try {

              }
              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })
              }
}

module.exports = { viewTimetable, deleteTimetable, addTimeTable }
