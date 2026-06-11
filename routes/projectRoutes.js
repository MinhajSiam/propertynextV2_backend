const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// ১. নতুন প্রজেক্ট যুক্ত করা (Create Project)
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
        // নতুন প্রজেক্ট আগে দেখানোর জন্য sort করা হয়েছে
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

// ৫. প্রজেক্ট আপডেট করা (Update Project)
router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // নতুন আপডেট হওয়া ডেটা রিটার্ন করবে
        );
        if (!updatedProject) return res.status(404).json({ success: false, message: "Project not found" });
        res.status(200).json({ success: true, message: "Project updated successfully", data: updatedProject });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating project", error: error.message });
    }
});

// ৬. একটি নির্দিষ্ট প্রজেক্টের ডেটা আনা (Get Single Project by ID)
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.req.params.id);
        if (!project) return res.status(404).json({ success: false, message: "Project not found" });
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching project details" });
    }
});

module.exports = router;