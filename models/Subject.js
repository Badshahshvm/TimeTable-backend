const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
              name: {
                            type: String,
                            required: true,

              },
              subjectType: {
                            type: String,
                            enum: ["Lecture", "Theory", "Practical"],
                            default: "Lecture",
                            required: true
              },
              semester: {
                            type: String,
                            required: true
              },
              branch
                            : {
                            type: String,
                            required: true

              },
              credit: {
                            type: String, required: true
              }
},
              {
                            timestamps: true
              })

const subjectModel = mongoose.model("Subject", subjectSchema);
module.exports = subjectModel;