const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    // আগের বেসিক ফিল্ডগুলো
    title: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true, default: 'upcoming' },
    mainImage: { type: String, required: true },

    // নতুন যুক্ত করা 'At a Glance' ফিল্ডগুলো
    landArea: { type: String },        // যেমন: 6.55 Katha
    facing: { type: String },          // যেমন: North-West
    height: { type: String },          // যেমন: B + GF + 8 Floors
    totalUnits: { type: String },      // যেমন: 16
    sizeOfUnits: { type: String },     // যেমন: 1135 Sft, 1175 Sft
    handover: { type: String },        // যেমন: July 2026

    // Overview এবং Media
    overview: { type: String },        // প্রজেক্টের বিস্তারিত বর্ণনা
    galleryImages: [{ type: String }], // গ্যালারির একাধিক ছবির লিংক (Array)

    // Floor Plans এর ছবির লিংক
    floorPlanA: { type: String },
    floorPlanB: { type: String },
    groundFloorPlan: { type: String },

    // Virtual Tour (Video) ও Map
    videoUrl: { type: String },        // ইউটিউব এম্বেড লিংক
    mapUrl: { type: String }           // গুগল ম্যাপ এম্বেড লিংক

}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);