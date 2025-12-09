const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Class name is required'],
    unique: true
  },
  classNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  }
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);