const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String },
    location: { type: String },
    status: { type: String, default: 'upcoming' },
    mainImage: { type: String },

    landArea: { type: String },
    facing: { type: String },
    height: { type: String },
    totalUnits: { type: String },
    sizeOfUnits: { type: String },
    handover: { type: String },

    overview: { type: String },
    galleryImages: [{ type: String }],

    structuralFeatures: { type: String },
    flooring: { type: String },
    kitchenBath: { type: String },
    electrical: { type: String },
    locationAdvantages: [{ type: String }],

    // floorPlanA: { type: String },
    // floorPlanB: { type: String },
    // groundFloorPlan: { type: String },

    // পুরনো ৩টি লাইনের বদলে এই নতুন লাইনটি দেওয়া হলো যাতে ভবিষ্যতে আরও ফ্লোর প্ল্যান যুক্ত করা যায় সহজে
    floorPlans: { type: [String], default: [] },

    videoUrl: { type: String },
    mapUrl: { type: String },

    // ব্রোশিওর পিডিএফ এর ফিল্ড 
    brochureUrl: { type: String }

}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);