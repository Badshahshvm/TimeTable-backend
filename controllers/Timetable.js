const userModel = require("../models/Users");
const Subject = require("../models/Subject");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Faculty = require("../models/Assigned")
const Timetable = require("../models/Timetable")
const Timeslot = require("../models/Timeslot")



const addTimeslot = async (req, res) => {
              try {
                            const token = req.headers.authorization?.split(" ")[1];
                            if (!token) {
                                          return res.status(401).json({ success: false, message: "No token provided" });
                            }

                            const verifyUser = jwt.verify(token, "MyNAME");
                            const existUser = await userModel.findById(verifyUser.id);

                            if (!existUser) {
                                          return res.status(404).json({ success: false, message: "User Not Found" });
                            }

                            if (!["Admin", "HOD"].includes(existUser.role)) {
                                          return res.status(403).json({ success: false, message: "Unauthorized Action" });
                            }
                            const subject = await Subject.findById(req.body.subjectId)
                            if (!subject) {
                                          res.json({
                                                        success: false,
                                                        message: "Subject Not Found!!!!"
                                          })
                            }
                            const timeslot = new Timeslot({
                                          duration: req.body.duration,
                                          subjectId: subject._id

                            })
                            await timeslot.save();

                            res.json({
                                          success: true,
                                          timeslot: timeslot
                            })

              }
              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })
              }
}

const getAllTimeslot = async (req, res) => {
              try {
                            const timeslot = await Timeslot.find({

                            }).populate("subject faculty")
                            res.json({
                                          success: false,
                                          message: "All Slots are here",
                                          timeslot: timeslot
                            })

              }
              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })
              }
}

const viewTimetable = async (req, res) => {
              try {
                            const timetable = await Timetable.findById(req.params.id);
                            if (!timetable) {
                                          res.json({
                                                        success: false,
                                                        message: "Timetable Not Found"
                                          })
                            }
                            res.json({
                                          success: true,
                                          message: "All Timetables are",
                                          timetable: timetable
                            })

              }
              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })
              }
}



const addTimeTable = async (req, res) => {
              try {

                            const token = req.headers.authorization?.split(" ")[1];
                            if (!token) {
                                          return res.status(401).json({ success: false, message: "No token provided" });
                            }

                            const verifyUser = jwt.verify(token, "MyNAME");
                            const existUser = await userModel.findById(verifyUser.id);

                            if (!existUser) {
                                          return res.status(404).json({ success: false, message: "User Not Found" });
                            }

                            if (!["Admin", "HOD"].includes(existUser.role)) {
                                          return res.status(403).json({ success: false, message: "Unauthorized Action" });
                            }



                            const timeTable = new Timetable({
                                          roomno: req.body.roomno,
                                          semester: req.body.semester,
                                          batch: req.body.batch,
                                          branch: req.body.branch,

                                          faculty: req.body.faculty,
                                          isPublish: req.body.isPublish,
                                          collegeName: req.body.collegeName,
                                          venue: req.body.venue
                            })
                            const subject = await Subject.findById(req.body.subject);
                            timeTable.subject.push(subject._id)

                            await timeTable.save();


                            res.json({
                                          success: true,
                                          message: "Timetable is ceated",
                                          timetable: timeTable
                            })

              }
              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })
              }
}

const getAllTimetable = async (req, res) => {
              try {
                            const timetables = await Timetable.find({}).populate("faculty subject");
                            res.json({
                                          success: true,
                                          timetables: timetables
                            })




              }

              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })
              }
}
module.exports = { viewTimetable, addTimeTable, getAllTimetable, addTimeslot, getAllTimeslot }
