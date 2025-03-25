const userModel = require("../models/Users");
const Subject = require("../models/Subject");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Faculty = require("../models/Assigned")



const addFaculty = async (req, res) => {
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

                            const faculty = new Faculty({
                                          name: req.body.name,

                                          branch: req.body.branch,
                                          isAvailable: req.body.isAvailable

                            });

                            await faculty.save();

                            res.status(201).json({
                                          success: true, message: "Fculty added successfully",
                                          faculty: faculty
                            });

              } catch (err) {
                            res.status(500).json({ success: false, message: err.message });
              }
};



// const assignSubject = async (req, res) => {
//               try {
//                             const { facultyName, branch, subjectName, startTime, endTime } = req.body;

//                             // Fetch faculty by name and branch
//                             const faculty = await Faculty.findOne({ name: facultyName, branch });
//                             if (!faculty) {
//                                           return res.status(404).json({ success: false, message: "Faculty not found" });
//                             }

//                             // Fetch subject by name
//                             const subject = await Subject.findOne({ name: subjectName });
//                             if (!subject) {
//                                           return res.status(404).json({ success: false, message: "Subject not found" });
//                             }

//                             // Check for time conflicts
//                             const hasConflict = faculty.assignments.some(assignment => {
//                                           const start = new Date(assignment.startTime);
//                                           const end = new Date(assignment.endTime);
//                                           const newStart = new Date(startTime);
//                                           const newEnd = new Date(endTime);

//                                           return (
//                                                         (newStart < end && newEnd > start) ||   // Overlaps with existing assignment
//                                                         (newStart.getTime() === start.getTime() && newEnd.getTime() === end.getTime())  // Same time
//                                           );
//                             });

//                             if (hasConflict) {
//                                           return res.status(409).json({ success: false, message: "Time conflict with existing assignment" });
//                             }

//                             // Assign faculty to the subject
//                             faculty.assignments.push({
//                                           subject: subject._id,
//                                           startTime: new Date(startTime),
//                                           endTime: new Date(endTime)
//                             });

//                             await faculty.save();
//                             res.status(200).json({
//                                           success: true,
//                                           message: "Faculty assigned successfully",
//                                           faculty
//                             });

//               } catch (error) {
//                             res.status(500).json({ success: false, message: error.message });
//               }
// }




const assignSubject = async (req, res) => {
              try {
                            // ✅ Extract and validate token
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


                            const { facultyName, branch, subjectName, startTime, endTime } = req.body;


                            const faculty = await Faculty.findOne({ name: facultyName, branch });


                            if (!faculty) {
                                          return res.status(404).json({ success: false, message: "Faculty not found" });
                            }


                            const subject = await Subject.findOne({ name: subjectName });
                            if (!subject) {
                                          return res.status(404).json({ success: false, message: "Subject not found" });
                            }


                            const newStartTime = new Date(startTime);
                            const newEndTime = new Date(endTime);

                            const hasConflict = faculty.classes.some(assignment => {
                                          const existingStart = new Date(assignment.startTime);
                                          const existingEnd = new Date(assignment.endTime);

                                          return (
                                                        (newStartTime < existingEnd && newEndTime > existingStart)
                                          );
                            });

                            if (hasConflict) {
                                          return res.status(409).json({ success: false, message: "Time conflict with existing assignment" });
                            }


                            faculty.classes.push({
                                          subject: subject._id,
                                          startTime: newStartTime,
                                          endTime: newEndTime
                            });

                            await faculty.save();

                            res.status(200).json({
                                          success: true,
                                          message: "Faculty assigned successfully",
                                          faculty
                            });

              } catch (error) {
                            res.status(500).json({ success: false, message: error.message });
              }
};


const getFacultyProfile = async (req, res) => {
              try {
                            // const faculty = await Faculty.findById(req.params.id).populate({

                            // });
                            const faculty = await Faculty.findById(req.params.id)
                                          .populate({
                                                        path: "classes.subject",
                                                        model: "Subject",

                                          });
                            if (!faculty) {
                                          res.json({
                                                        success: false,
                                                        message: "Faculty Not Found"
                                          })
                            }

                            res.json({
                                          success: true,
                                          message: "Faculty Fetched Sucessfully",
                                          faculty: faculty
                            })


              }
              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })
              }
}

const getAllFaculty = async (req, res) => {
              try {
                            const faculty = await Faculty.find({}).populate({
                                                        path: "classes.subject",
                                                        model: "Subject",

                                          });
                            res.json({
                                          success: true,
                                          message: "AllFaculties are here",
                                          faculty: faculty
                            })

              }
              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })
              }
}
module.exports = { addFaculty, assignSubject, getFacultyProfile, getAllFaculty }
