const mongoose = require('mongoose');

const NurseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true 
    },
    status: {
        type: String,
        default: 'Active' 
    },
    pendingRequests: {
        type: Number,
        default: 0
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

module.exports = mongoose.model('Nurse', NurseSchema);