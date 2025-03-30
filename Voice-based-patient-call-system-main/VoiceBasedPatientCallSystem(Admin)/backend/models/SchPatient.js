const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    contactNumber: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    medicalHistory: {
        type: String
    },
    condition: {
        type: String,
        default: 'Stable' 
    },
    nurse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nurse' 
    },
    requestStatus: {
        type: String,
        default: 'Pending'
    },
    roomNo: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Patient', PatientSchema);