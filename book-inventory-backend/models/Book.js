const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  book_name: {
    type: String,
    required: [true, 'Book name is required'],
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required']
  },
  publisher: {
    type: String,
    required: [true, 'Publisher is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);