const express = require('express');
const router = express.Router();

// আপনি ঠিক যেভাবে চাচ্ছিলেন
const blog = require('../models/blog');

// ১. ব্লগ যোগ করা
router.post('/add', async (req, res) => {
    try {
        const newBlog = new blog(req.body); // Blog এর জায়গায় blog
        await newBlog.save();
        res.status(201).json({ success: true, message: "ব্লগ সফলভাবে প্রকাশ হয়েছে!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ২. সব ব্লগ একসাথে দেখা
router.get('/all', async (req, res) => {
    try {
        const blogs = await blog.find().sort({ createdAt: -1 }); // Blog এর জায়গায় blog
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ৩. একটি নির্দিষ্ট ব্লগ দেখা
router.get('/:id', async (req, res) => {
    try {
        // মডেলের নামের সাথে কনফ্লিক্ট এড়াতে ভেরিয়েবলের নাম singleBlog দেওয়া হলো
        const singleBlog = await blog.findById(req.params.id);
        if (!singleBlog) return res.status(404).json({ success: false, message: "ব্লগ পাওয়া যায়নি" });
        res.status(200).json({ success: true, data: singleBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ৪. ব্লগ এডিট/আপডেট করা
router.put('/:id', async (req, res) => {
    try {
        const updatedBlog = await blog.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Blog এর জায়গায় blog
        res.status(200).json({ success: true, data: updatedBlog, message: "ব্লগ আপডেট হয়েছে!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ৫. ব্লগ ডিলিট করা
router.delete('/:id', async (req, res) => {
    try {
        await blog.findByIdAndDelete(req.params.id); // Blog এর জায়গায় blog
        res.status(200).json({ success: true, message: "ব্লগ ডিলিট করা হয়েছে!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;