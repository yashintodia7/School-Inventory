**📚 School Book Inventory Management System**

A comprehensive MERN Stack application for managing school book inventory with an intuitive admin panel. Create, manage, and organize book sets based on Board, Medium, Class, and Academic Year.

**🎯 Features**

**✨ Core Functionality**


Create Book Sets - Combine multiple books with Board, Medium, Class, and Year

Manage Inventory - Full CRUD operations (Create, Read, Update, Delete)

Advanced Filtering - Filter book sets by Board, Medium, Class, or Academic Year

Quantity Management - Track quantity for each book in a set

Responsive Design - Works seamlessly on desktop, tablet, and mobile


**🎨 User Interface**


Modern gradient design with Tailwind CSS

Smooth animations and transitions

Real-time notifications for user actions

Modal-based forms for better UX

Expandable cards to view book details

Color-coded information tags


**🔧 Technical Features**


RESTful API architecture

MongoDB with Mongoose ODM

Database relationships and references

Input validation and error handling

CORS enabled for frontend-backend communication

Environment variable configuration

**Collections**

**1. Board**

name - Board name (CBSE, ICSE, State Board)

**2. Medium**

name - Medium name (English, Hindi, Gujarati)

**3. Class**

name - Class name (Class 1 to 12)

classNumber - Numeric value (1-12)

**4. AcademicYear**

name - Year name (2024-2025)

startYear - Start year

endYear - End year

**5. Book**

book_name - Book title

subject - Subject name

publisher - Publisher name

**6. BookSet**

board_id - Reference to Board

medium_id - Reference to Medium

class_id - Reference to Class

year_id - Reference to AcademicYear

set_name - Custom set name

**7. BookSetItem (Junction Table)**

book_set_id - Reference to BookSet

book_id - Reference to Book

quantity - Number of books


**🚀 Installation & Setup**
Prerequisites

Node.js (v14 or higher)
MongoDB (Local installation OR MongoDB Atlas account)
npm or yarn
Git

**Step 1: Clone the Repository**



