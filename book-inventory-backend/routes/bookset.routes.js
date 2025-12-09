const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();
const booksetController = require('../controllers/bookset.controller');

router.post('/create', booksetController.createBookSet);
router.get('/', booksetController.getBookSets);
router.get('/:id', booksetController.getBookSetById);
router.put('/:id', booksetController.updateBookSet);
router.delete('/:id', booksetController.deleteBookSet);

module.exports = router;