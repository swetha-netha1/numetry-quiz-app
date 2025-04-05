require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Debug connection string (masked)
console.log('Connecting to MongoDB with:', 
  process.env.MONGODB_URI.replace(/:[^@]+@/, ':*****@'));

// MongoDB Connection with enhanced options
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 30000,
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error(' MongoDB connection failed:', err.message);
  
});

// Middleware
app.use(cors({
  origin: "numetry-quiz-app.vercel.app"
}));
app.use(express.json());

// Result Schema
const resultSchema = new mongoose.Schema({
  name: String,
  email: String,
  score: Number,
  totalQuestions: Number,
  percentage: Number,
  timestamp: { type: Date, default: Date.now }
});
const Result = mongoose.model('Result', resultSchema);

// API Routes
app.post('/api/results', async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/results', async (req, res) => {
  try {
    const results = await Result.find().sort({ timestamp: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));