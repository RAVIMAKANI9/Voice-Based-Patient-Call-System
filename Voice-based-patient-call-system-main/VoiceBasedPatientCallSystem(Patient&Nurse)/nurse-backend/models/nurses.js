const mongoose = require("mongoose");

const NurseSchema = new mongoose.Schema({
  nurseID: { type: Number , required: true },
  nurseName:{ type:String , required:true },
  department:{ type:String , required:true },
});

module.exports = mongoose.model("nurses", NurseSchema);

