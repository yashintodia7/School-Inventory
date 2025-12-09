const express = require('express');
const router = express.Router();
const Board = require('../models/Board');

router.get('/', async (req, res) => {
  try {
    const boards = await Board.find().sort({ name: 1 });
    res.json({ success: true, data: boards });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const board = await Board.create(req.body);
    res.status(201).json({ success: true, data: board });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;