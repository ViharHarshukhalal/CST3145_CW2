// express-app/routes/lessons.js

const express = require('express');
const router = express.Router();
const connect = require('../db');

// GET Route
router.get('/', async (req, res) => {
  const db = await connect();
  const lessons = await db.collection('lessons').find().toArray();
  res.json(lessons);
});

router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST Route
router.post('/Order', async (req, res) => {
  
});

// PUT Route
router.put('/update/:id', async (req, res) => {
  
});

router.get('/search', async (req, res) => {
    const { query } = req.query;
    const db = await connect();
    
  });

module.exports = router;
