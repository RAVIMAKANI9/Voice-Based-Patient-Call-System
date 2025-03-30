const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  nurseID : { type: Number, required: true },
});

module.exports = mongoose.model("users", UserSchema);


