const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// ১. নতুন লিড যুক্ত করার API (পাবলিক ওয়েবসাইটের ফর্ম থেকে আসবে)
router.post('/add', async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        await newLead.save();
        res.status(201).json({ success: true, message: "আপনার মেসেজটি সফলভাবে পাঠানো হয়েছে। আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।" });
    } catch (error) {
        console.error("Lead Add Error:", error);
        res.status(500).json({ success: false, message: "সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন।" });
    }
});

// ২. সব লিড দেখার API (অ্যাডমিন প্যানেলের জন্য)
router.get('/all', async (req, res) => {
    try {
        // নতুন লিডগুলো সবার ওপরে দেখানোর জন্য sort({ createdAt: -1 }) ব্যবহার করা হয়েছে
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: leads });
    } catch (error) {
        console.error("Lead Fetch Error:", error);
        res.status(500).json({ success: false, message: "ডেটা আনতে সমস্যা হচ্ছে।" });
    }
});

// ৩. লিডের স্ট্যাটাস আপডেট করার API (অ্যাডমিন যখন কাস্টমারকে কল করবে)
router.put('/:id', async (req, res) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.status(200).json({ success: true, message: "স্ট্যাটাস আপডেট হয়েছে!", data: updatedLead });
    } catch (error) {
        res.status(500).json({ success: false, message: "আপডেট করতে সমস্যা হয়েছে।" });
    }
});

// ৪. লিড ডিলিট করার API
router.delete('/:id', async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "লিড ডিলিট করা হয়েছে!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "ডিলিট করতে সমস্যা হয়েছে।" });
    }
});

module.exports = router;