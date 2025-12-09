const express = require('express');
const router = express.Router();
const AcademicYear = require('../models/AcademicYear');

router.get('/', async (req, res) => {
  try {
    const years = await AcademicYear.find().sort({ startYear: -1 });
    res.json({ success: true, data: years });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const year = await AcademicYear.create(req.body);
    res.status(201).json({ success: true, data: year });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;