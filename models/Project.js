const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    // বেসিক ইনফরমেশন
    title: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, enum: ['ongoing', 'upcoming', 'completed'], required: true },
    badge: { type: String },

    // ছবি ও ভিডিও
    mainImage: { type: String, required: true },
    gallery: [{ type: String }],
    virtualTourVideo: { type: String },
    brochureLink: { type: String },

    // ডাইনামিক ডেটা (অ্যাডমিন প্যানেল থেকে যতো খুশি এড করা যাবে)
    atAGlance: [{
        label: String,
        value: String
    }],

    overview: [{ type: String }],

    specifications: [{
        categoryName: String,
        items: [String]
    }],

    floorPlans: [{
        planName: String,
        planImage: String
    }]

}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);