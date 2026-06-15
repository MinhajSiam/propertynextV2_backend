const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// ১. নতুন লিড যুক্ত করার API (টেলিগ্রাম এবং গুগল শিট সহ)
router.post('/add', async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        await newLead.save(); // ডেটাবেসে সেভ হলো

        const { name, phone, email, interest, message } = req.body;

        // ----------------------------------------------------
        // [A] Telegram-এ মেসেজ পাঠানো
        // ----------------------------------------------------
        const telegramToken = '8667931377:AAG_mI-1IR5kvkbY3yfw2sbhBNtbY0D_Gec'; // ধাপ ১ থেকে পাওয়া টোকেন বসান
        const chatId = '-5342084527';

        const telegramMsg = `🔔 <b>New Lead Alert!</b>\n\n👤 <b>Name:</b> ${name}\n📞 <b>Phone:</b> ${phone}\n📧 <b>Email:</b> ${email || 'N/A'}\n🏢 <b>Project:</b> ${interest || 'N/A'}\n💬 <b>Message:</b> ${message || 'N/A'}`;

        // টেলিগ্রাম API কল (await দেওয়া হয়নি যাতে ইউজারের পেজ লোড হতে দেরি না হয়)
        fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: telegramMsg,
                parse_mode: 'HTML'
            })
        }).catch(err => console.error('Telegram Fetch Error:', err));

        // ----------------------------------------------------
        // [B] Google Sheet-এ ডেটা পাঠানো
        // ----------------------------------------------------
        const googleSheetWebhookUrl = 'https://script.google.com/macros/s/AKfycbyz6ER2aXevifk4FQ8u62hTmgW1kLwv_sMe19W46LXfytTzXuuUc-4FNueJgsD8xME/exec'; // ধাপ ২ থেকে পাওয়া Web app URL বসান

        fetch(googleSheetWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        }).catch(err => console.error('Google Sheet Fetch Error:', err));

        // সবশেষে ফ্রন্টএন্ডে কাস্টমারকে সাকসেস মেসেজ পাঠানো
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

router.get('/all', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 }); // নতুন লিডগুলো একদম ওপরে দেখাবে
        res.status(200).json({ success: true, data: leads });
    } catch (error) {
        res.status(500).json({ success: false, message: "সার্ভার এরর" });
    }
});

// লিডের স্ট্যাটাস আপডেট করার API
router.patch('/:id/status', async (req, res) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.status(200).json({ success: true, data: updatedLead, message: "স্ট্যাটাস আপডেট হয়েছে" });
    } catch (error) {
        console.error("Status Update Error:", error);
        res.status(500).json({ success: false, message: "সার্ভার এরর" });
    }
});

// লিড ডিলিট করার API
router.delete('/:id', async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "লিড সফলভাবে ডিলিট হয়েছে" });
    } catch (error) {
        console.error("Delete Lead Error:", error);
        res.status(500).json({ success: false, message: "সার্ভার এরর" });
    }
});



module.exports = router;