const mongoose = require('mongoose');

const academicYearSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Academic year name is required'],
    unique: true
  },
  startYear: {
    type: Number,
    required: true
  },
  endYear: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('AcademicYear', academicYearSchema);