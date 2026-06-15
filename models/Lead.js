const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    interest: {
        type: String,
        default: 'General Inquiry' // যেমন: Flat Booking, Shop Booking, General
    },
    message: {
        type: String
    },
    status: {
        type: String,
        default: 'New' // New, Contacted, Rejected, Deal Closed
    }

}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);