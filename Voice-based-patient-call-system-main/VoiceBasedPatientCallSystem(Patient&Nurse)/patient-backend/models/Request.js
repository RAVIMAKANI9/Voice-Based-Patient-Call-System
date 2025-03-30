const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  requestText: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Request", RequestSchema);
