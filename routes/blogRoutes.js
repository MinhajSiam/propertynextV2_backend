const express = require('express');
const router = express.Router();
// 🟢 সংশোধন: বামপাশের ভেরিয়েবলটিকে Blog (বড় হাতের B) করা হলো, ভেতরের পাথ ছোট হাতেরই থাকবে
const Blog = require('../models/blog');

// ১. ব্লগ যোগ করা
router.post('/add', async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        await newBlog.save();
        res.status(201).json({ success: true, message: "ব্লগ সফলভাবে প্রকাশ হয়েছে!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ২. সব ব্লগ একসাথে দেখা
router.get('/all', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }); // নতুন ব্লগ আগে দেখাবে
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ৩. একটি নির্দিষ্ট ব্লগ দেখা
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: "ব্লগ পাওয়া যায়নি" });
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ৪. ব্লগ এডিট/আপডেট করা
router.put('/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: updatedBlog, message: "ব্লগ আপডেট হয়েছে!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ৫. ব্লগ ডিলিট করা
router.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "ব্লগ ডিলিট করা হয়েছে!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;