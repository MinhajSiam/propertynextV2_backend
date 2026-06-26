const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true }, // যেমন: Interior, Lifestyle, Real Estate
    mainImage: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true }); // এটি অটোমেটিকভাবে ব্লগ তৈরির তারিখ (date) সেভ করে রাখবে

module.exports = mongoose.model('Blog', blogSchema);