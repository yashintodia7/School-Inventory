const express = require('express');
const router = express.Router();
const Medium = require('../models/Medium');

router.get('/', async (req, res) => {
  try {
    const mediums = await Medium.find().sort({ name: 1 });
    res.json({ success: true, data: mediums });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const medium = await Medium.create(req.body);
    res.status(201).json({ success: true, data: medium });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;