const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    status: {
        type: String,
        enum: ['pending', 'assigned', 'resolved'],
        default: 'pending'
    },
    department: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);
