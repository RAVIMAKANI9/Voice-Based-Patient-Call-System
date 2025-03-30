const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  requests: [{ text: String, time: String }],
});

module.exports = mongoose.model("User", UserSchema);
