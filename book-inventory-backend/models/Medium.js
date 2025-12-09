const mongoose = require('mongoose');

const mediumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Medium name is required'],
    unique: true,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Medium', mediumSchema);