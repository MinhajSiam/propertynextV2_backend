const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// লিড রাউট যুক্ত করুন
app.use('/api/leads', require('./routes/leadRoutes'));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB successfully!");
    }).catch((error) => {
        console.error("MongoDB connection failed:", error);
    });


// ==========================================
// API ROUTES
// ==========================================
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes); // সব প্রজেক্ট রাউট /api/projects দিয়ে শুরু হবে


// Basic Test Route
app.get('/', (req, res) => {
    res.send("PropertyNext Backend API is running!");
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});