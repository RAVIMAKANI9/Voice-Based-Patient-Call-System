const mongoose = require("mongoose");

const patientRequestsSchema = new mongoose.Schema({
    patientID: { type: Number, required: true },
    nurseID: { type: Number, required: true },
    request: { type: String, required: true },
    status: { type: String, enum: ["pending", "inProgress", "completed"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("patientRequests", patientRequestsSchema);