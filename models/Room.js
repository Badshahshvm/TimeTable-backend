const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
              no: {
                            type: String, required: true
              },
              venue: {
                            type: String, required: true
              },
              isActive: {
                            type: Boolean,
                            default: "True"
              }
},
              {
                            timestamps: true
              })


const roomModel = mongoose.model("Room", roomSchema);
module.exports = roomModel