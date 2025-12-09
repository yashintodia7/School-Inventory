const mongoose = require('mongoose');

const bookSetItemSchema = new mongoose.Schema({
  book_set_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookSet',
    required: true
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  }
}, { timestamps: true });

module.exports = mongoose.model('BookSetItem', bookSetItemSchema);