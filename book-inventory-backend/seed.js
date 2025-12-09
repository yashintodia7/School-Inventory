const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Board = require('./models/Board');
const Medium = require('./models/Medium');
const Class = require('./models/Class');
const AcademicYear = require('./models/AcademicYear');
const Book = require('./models/Book');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Board.deleteMany({});
    await Medium.deleteMany({});
    await Class.deleteMany({});
    await AcademicYear.deleteMany({});
    await Book.deleteMany({});

    await Board.insertMany([
      { name: 'CBSE' },
      { name: 'ICSE' },
      { name: 'State Board' }
    ]);

    await Medium.insertMany([
      { name: 'English' },
      { name: 'Hindi' },
      { name: 'Gujarati' }
    ]);

    const classes = [];
    for (let i = 1; i <= 12; i++) {
      classes.push({ name: `Class ${i}`, classNumber: i });
    }
    await Class.insertMany(classes);

    await AcademicYear.insertMany([
      { name: '2023-2024', startYear: 2023, endYear: 2024 },
      { name: '2024-2025', startYear: 2024, endYear: 2025 },
      { name: '2025-2026', startYear: 2025, endYear: 2026 }
    ]);

    await Book.insertMany([
      { book_name: 'Mathematics Textbook', subject: 'Mathematics', publisher: 'NCERT' },
      { book_name: 'Science Textbook', subject: 'Science', publisher: 'NCERT' },
      { book_name: 'English Grammar', subject: 'English', publisher: 'Oxford' },
      { book_name: 'Social Studies', subject: 'Social Science', publisher: 'NCERT' },
      { book_name: 'Hindi Vyakaran', subject: 'Hindi', publisher: 'Arihant' },
      { book_name: 'Computer Science', subject: 'Computer', publisher: 'NCERT' }
    ]);

    console.log('✅ Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();