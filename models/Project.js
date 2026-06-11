const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true, default: 'upcoming' },
    mainImage: { type: String, required: true },

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

    floorPlanA: { type: String },
    floorPlanB: { type: String },
    groundFloorPlan: { type: String },

    videoUrl: { type: String },
    mapUrl: { type: String },

    // ব্রোশিওর পিডিএফ এর ফিল্ড 
    brochureUrl: { type: String }

}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);