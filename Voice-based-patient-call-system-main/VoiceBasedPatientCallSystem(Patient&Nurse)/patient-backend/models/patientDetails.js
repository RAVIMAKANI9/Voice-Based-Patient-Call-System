const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  patientId : {type: Number, required: true},
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  disease : {type: String, required: true},
  remarks : {type: String, required: true},
  roomNo : {type: String, required: true},
  nurseID : {type: String, required: true},
});

module.exports = mongoose.model("patientDetails", UserSchema);

