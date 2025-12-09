const BookSet = require('../models/BookSet');
const BookSetItem = require('../models/BookSetItem');

// CREATE Book Set
exports.createBookSet = async (req, res) => {
  try {
    const { board_id, medium_id, class_id, year_id, set_name, books } = req.body;

    if (!board_id || !medium_id || !class_id || !year_id || !set_name || !books || books.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required and at least one book must be selected' 
      });
    }

    const bookSet = await BookSet.create({
      board_id,
      medium_id,
      class_id,
      year_id,
      set_name
    });

    const bookSetItems = books.map(book => ({
      book_set_id: bookSet._id,
      book_id: book.book_id,
      quantity: book.quantity || 1
    }));

    await BookSetItem.insertMany(bookSetItems);

    const completeBookSet = await BookSet.findById(bookSet._id)
      .populate('board_id')
      .populate('medium_id')
      .populate('class_id')
      .populate('year_id');

    const items = await BookSetItem.find({ book_set_id: bookSet._id })
      .populate('book_id');

    res.status(201).json({
      success: true,
      message: 'Book set created successfully',
      data: {
        bookSet: completeBookSet,
        books: items
      }
    });

  } catch (error) {
    console.error('Error creating book set:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating book set', 
      error: error.message 
    });
  }
};

// GET All Book Sets with Filters
exports.getBookSets = async (req, res) => {
  try {
    const { board_id, medium_id, class_id, year_id } = req.query;

    const filter = {};
    if (board_id) filter.board_id = board_id;
    if (medium_id) filter.medium_id = medium_id;
    if (class_id) filter.class_id = class_id;
    if (year_id) filter.year_id = year_id;

    const bookSets = await BookSet.find(filter)
      .populate('board_id')
      .populate('medium_id')
      .populate('class_id')
      .populate('year_id')
      .sort({ createdAt: -1 });

    const bookSetsWithBooks = await Promise.all(
      bookSets.map(async (set) => {
        const books = await BookSetItem.find({ book_set_id: set._id })
          .populate('book_id');
        
        return {
          ...set.toObject(),
          books: books
        };
      })
    );

    res.status(200).json({
      success: true,
      count: bookSetsWithBooks.length,
      data: bookSetsWithBooks
    });

  } catch (error) {
    console.error('Error fetching book sets:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching book sets', 
      error: error.message 
    });
  }
};

// GET Single Book Set
exports.getBookSetById = async (req, res) => {
  try {
    const bookSet = await BookSet.findById(req.params.id)
      .populate('board_id')
      .populate('medium_id')
      .populate('class_id')
      .populate('year_id');

    if (!bookSet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Book set not found' 
      });
    }

    const books = await BookSetItem.find({ book_set_id: bookSet._id })
      .populate('book_id');

    res.status(200).json({
      success: true,
      data: {
        bookSet,
        books
      }
    });

  } catch (error) {
    console.error('Error fetching book set:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching book set', 
      error: error.message 
    });
  }
};

// UPDATE Book Set
exports.updateBookSet = async (req, res) => {
  try {
    const { board_id, medium_id, class_id, year_id, set_name, books } = req.body;

    const bookSet = await BookSet.findByIdAndUpdate(
      req.params.id,
      { board_id, medium_id, class_id, year_id, set_name },
      { new: true, runValidators: true }
    )
      .populate('board_id')
      .populate('medium_id')
      .populate('class_id')
      .populate('year_id');

    if (!bookSet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Book set not found' 
      });
    }

    await BookSetItem.deleteMany({ book_set_id: req.params.id });

    if (books && books.length > 0) {
      const bookSetItems = books.map(book => ({
        book_set_id: bookSet._id,
        book_id: book.book_id,
        quantity: book.quantity || 1
      }));

      await BookSetItem.insertMany(bookSetItems);
    }

    const updatedBooks = await BookSetItem.find({ book_set_id: bookSet._id })
      .populate('book_id');

    res.status(200).json({
      success: true,
      message: 'Book set updated successfully',
      data: {
        bookSet,
        books: updatedBooks
      }
    });

  } catch (error) {
    console.error('Error updating book set:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating book set', 
      error: error.message 
    });
  }
};

// DELETE Book Set
exports.deleteBookSet = async (req, res) => {
  try {
    const bookSet = await BookSet.findById(req.params.id);

    if (!bookSet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Book set not found' 
      });
    }

    await BookSetItem.deleteMany({ book_set_id: req.params.id });
    await BookSet.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Book set deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting book set:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting book set', 
      error: error.message 
    });
  }
};