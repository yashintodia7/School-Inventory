const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Function to check if route file exists
const routeExists = (filename) => {
  return fs.existsSync(path.join(__dirname, 'routes', filename));
};

// Routes - only load if they exist
if (routeExists('board.routes.js')) {
  app.use('/api/boards', require('./routes/board.routes'));
  console.log('✅ Board routes loaded');
} else {
  console.log('⚠️  board.routes.js not found');
}

if (routeExists('medium.routes.js')) {
  app.use('/api/mediums', require('./routes/medium.routes'));
  console.log('✅ Medium routes loaded');
} else {
  console.log('⚠️  medium.routes.js not found');
}

if (routeExists('class.routes.js')) {
app.use('/api/classes', require('./routes/class.routes')); 
  console.log('✅ Class routes loaded');
} else {
  console.log('⚠️  class.routes.js not found');
}

if (routeExists('year.routes.js')) {
  app.use('/api/years', require('./routes/year.routes'));
  console.log('✅ Year routes loaded');
} else {
  console.log('⚠️  year.routes.js not found');
}

if (routeExists('book.routes.js')) {
  app.use('/api/books', require('./routes/book.routes'));
  console.log('✅ Book routes loaded');
} else {
  console.log('⚠️  book.routes.js not found');
}

if (routeExists('bookset.routes.js')) {
  app.use('/api/book-sets', require('./routes/bookset.routes'));
  console.log('✅ BookSet routes loaded');
} else {
  console.log('⚠️  bookset.routes.js not found');
}

app.get('/', (req, res) => {
  res.json({ message: 'Book Inventory API is running!' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: err.message 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});