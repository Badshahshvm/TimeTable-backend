const mongoose = require("mongoose");

const timeTableSchema = mongoose.Schema({
              roomno: {
                            type: String, required: true,
                            unique: true
              },
              semester: {
                            type: String, required: true
              },
              batch: {
                            type: String, required: true
              },
              barnch: {
                            type: String,
                            required: true
              },
              subject: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Subject",
                            required: true
              },
              faculty: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Faculty",
                            required: true
              },
              publish: {
                            type: Boolean,
                            default: false
              },
              collegeName: {
                            type: String,
                            required: true
              },
              venue: {
                            type: String,
                            required: True
              }


},
              {
                            timestamps: true
              })

const timeTableModel = mongoose.model("Timetable", timeTableSchema);
module.exports = timeTableModel