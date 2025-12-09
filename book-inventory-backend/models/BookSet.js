const mongoose = require('mongoose');

const bookSetSchema = new mongoose.Schema({
  board_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: [true, 'Board is required']
  },
  medium_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medium',
    required: [true, 'Medium is required']
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: [true, 'Class is required']
  },
  year_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademicYear',
    required: [true, 'Academic year is required']
  },
  set_name: {
    type: String,
    required: [true, 'Set name is required'],
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('BookSet', bookSetSchema);