const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nurseID: { type: Number , required: true },
  nurseName:{type:String , required:true},
  date: { type: String, required: true },
  shiftType : {type: String, required: true},
});

module.exports = mongoose.model("nurseShifts", UserSchema);


