const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
              name: { type: String, required: true },
              email: { type: String, unique: true, required: true },
              password: { type: String, required: true },
              role: {
                            type: String, enum: ['Admin', 'Faculty', 'Student', "HOD"],
                            default: "Admin", required: true
              },
              branch: { type: String },
              semester: { type: Number },
              batch: { type: String },
}, { timestamps: true })



const userModel = mongoose.model("Students", userSchema);
module.exports = userModel;