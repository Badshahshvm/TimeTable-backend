// const mongoose = require("mongoose");

// const assignmentSchema = new mongoose.Schema({
//               subject: {
//                             type: mongoose.Schema.Types.ObjectId,
//                             ref: "Subject",
//                             required: true
//               },
//               assignedAt: {
//                             type: Date,
//                             default: Date.now
//               },
//               startTime: {
//                             type: Date,
//                             required: true
//               },
//               endTime: {
//                             type: Date,
//                             required: true
//               }
// });

// // Pre-save hook to prevent time conflicts
// assignmentSchema.pre("validate", async function (next) {
//               const facultyId = this.parent()._id;
//               const newStartTime = new Date(this.startTime);
//               const newEndTime = new Date(this.endTime);

//               // Fetch existing faculty assignments
//               const faculty = await mongoose.model("Faculty").findById(facultyId);
//               if (!faculty) {
//                             return next(new Error("Faculty not found"));
//               }

//               const conflictingAssignment = faculty.assignments.some(assignment => {
//                             const existingStartTime = new Date(assignment.startTime);
//                             const existingEndTime = new Date(assignment.endTime);

//                             // Check for overlapping assignments
//                             return (
//                                           (newStartTime < existingEndTime && newEndTime > existingStartTime) // Overlapping condition
//                             );
//               });

//               if (conflictingAssignment) {
//                             return next(new Error("Time conflict: Faculty is already assigned at this time."));
//               }

//               next();
// });

// const facultySchema = new mongoose.Schema({
//               name: {
//                             type: String,
//                             required: true
//               },
//               branch: {
//                             type: String,
//                             required: true
//               },
//               isAvailable: {
//                             type: Boolean,
//                             default: false
//               },
//               classes: [assignmentSchema]
// }, { timestamps: true });

// module.exports = mongoose.model("Faculty", facultySchema);
const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
              subject: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Subject",
                            required: true
              },
              assignedAt: {
                            type: Date,
                            default: Date.now
              },
              startTime: {
                            type: Date,
                            required: true
              },
              endTime: {
                            type: Date,
                            required: true
              }
});

// ✅ Pre-save hook to prevent time conflicts
assignmentSchema.pre("validate", async function (next) {
              const facultyId = this.parent()._id;
              const newStartTime = new Date(this.startTime);
              const newEndTime = new Date(this.endTime);

              const faculty = await mongoose.model("Faculty").findById(facultyId);
              if (!faculty) {
                            return next(new Error("Faculty not found"));
              }

              const conflictingAssignment = faculty.classes.some(assignment => {
                            const existingStartTime = new Date(assignment.startTime);
                            const existingEndTime = new Date(assignment.endTime);

                            return (
                                          (newStartTime < existingEndTime && newEndTime > existingStartTime)  // Time overlap check
                            );
              });

              if (conflictingAssignment) {
                            return next(new Error("Time conflict: Faculty is already assigned at this time."));
              }

              next();
});

const facultySchema = new mongoose.Schema({
              name: {
                            type: String,
                            required: true
              },
              branch: {
                            type: String,
                            required: true
              },
              isAvailable: {
                            type: Boolean,
                            default: false
              },
              classes: [assignmentSchema]  // Array of assignments
}, { timestamps: true });

module.exports = mongoose.model("Faculty", facultySchema);
