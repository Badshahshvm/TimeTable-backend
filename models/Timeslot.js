const mongoose = require("mongoose");

const timeslotSchema = new mongoose.Schema({
              duration: {
                            type: String,
                            required: true
              },
              subjectId: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Subject",
                            required: true
              }
}, {
              timestamps: true
});

const timeslotModel = mongoose.model("Timeslot", timeslotSchema);
module.exports = timeslotModel;
