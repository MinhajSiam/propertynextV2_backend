const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// ১. নতুন প্রজেক্ট যুক্ত করা (Create Project)
// এখানে req.body থাকায় brochureUrl, structuralFeatures সহ সব ডেটা অটোমেটিক সেভ হবে
router.post('/add', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json({
            success: true,
            message: "Project added successfully!",
            data: savedProject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add project",
            error: error.message
        });
    }
});

// ২. সব প্রজেক্ট একসাথে দেখা (Get All Projects)
router.get('/all', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: projects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
            error: error.message
        });
    }
});

// ৩. একটি নির্দিষ্ট প্রজেক্ট দেখা (Get Single Project)
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: "Project not found" });
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching project", error: error.message });
    }
});

// ৪. প্রজেক্ট ডিলিট করা (Delete Project)
router.delete('/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({ success: false, message: "Project not found" });
        res.status(200).json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting project", error: error.message });
    }
});



// নির্দিষ্ট একটি প্রজেক্টের বিস্তারিত তথ্য পাঠানোর API
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: "প্রজেক্টটি পাওয়া যায়নি" });
        }
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        console.error("Single Project Fetch Error:", error);
        res.status(500).json({ success: false, message: "সার্ভার এরর" });
    }
});

module.exports = router;