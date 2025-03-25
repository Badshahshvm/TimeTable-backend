const userModel = require("../models/Users");
const Subject = require("../models/Subject");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const addSubject = async (req, res) => {
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

                            const subject = new Subject({
                                          name: req.body.name,
                                          subjectType: req.body.subjectType,
                                          semester: req.body.semester,
                                          branch: req.body.branch,
                                          credit: req.body.credit
                            });

                            await subject.save();

                            res.status(201).json({
                                          success: true, message: "Subject added successfully",
                                          subject: subject
                            });

              } catch (err) {
                            res.status(500).json({ success: false, message: err.message });
              }
};

const getAllSubject = async (req, res) => {
              try {
                            const subject = await Subject.find({})
                            res.json({
                                          success: true,
                                          message: "All subjects Fetch successfully",
                                          subject: subject
                            })

              }
              catch (err) {
                            res.json({
                                          success: false,
                                          message: err.message
                            })
              }
}


const deleteSubject = async (req, res) => {
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

                            const subjectId = req.params.id;
                            const subject = await Subject.findByIdAndDelete(subjectId);

                            if (!subject) {
                                          return res.status(404).json({ success: false, message: "Subject not found" });
                            }

                            res.status(200).json({
                                          success: true,
                                          message: "Subject deleted successfully"
                            });

              } catch (err) {
                            res.status(500).json({ success: false, message: err.message });
              }
};


module.exports = { addSubject, deleteSubject, getAllSubject };
