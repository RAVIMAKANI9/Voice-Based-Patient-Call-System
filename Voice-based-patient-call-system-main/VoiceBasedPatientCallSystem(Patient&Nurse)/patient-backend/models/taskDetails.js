const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  taskId : {type: Number, required: true},
  taskName: { type: String, required: true },
  taskStatus: { type: String, required: true },
  nurseID: { type: Number , required: true },
});

module.exports = mongoose.model("patientDetails", UserSchema);

