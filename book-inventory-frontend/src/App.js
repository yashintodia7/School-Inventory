import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, Search, Filter } from 'lucide-react';


const mockBoards = [
  { id: 1, name: 'CBSE' },
  { id: 2, name: 'ICSE' },
  { id: 3, name: 'State Board' }
];

const mockMediums = [
  { id: 1, name: 'English' },
  { id: 2, name: 'Hindi' },
  { id: 3, name: 'Gujarati' }
];

const mockClasses = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, name: `Class ${i + 1}` }));

const mockYears = [
  { id: 1, name: '2023-2024' },
  { id: 2, name: '2024-2025' },
  { id: 3, name: '2025-2026' }
];

const mockBooks = [
  { id: 1, book_name: 'Mathematics Textbook', subject: 'Mathematics', publisher: 'NCERT' },
  { id: 2, book_name: 'Science Textbook', subject: 'Science', publisher: 'NCERT' },
  { id: 3, book_name: 'English Grammar', subject: 'English', publisher: 'Oxford' },
  { id: 4, book_name: 'Social Studies', subject: 'Social Science', publisher: 'NCERT' },
  { id: 5, book_name: 'Hindi Vyakaran', subject: 'Hindi', publisher: 'Arihant' }
];

const App = () => {
  const [bookSets, setBookSets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSet, setEditingSet] = useState(null);
  const [filters, setFilters] = useState({
    board_id: '',
    medium_id: '',
    class_id: '',
    year_id: ''
  });
  const [expandedSet, setExpandedSet] = useState(null);

  const [formData, setFormData] = useState({
    board_id: '',
    medium_id: '',
    class_id: '',
    year_id: '',
    set_name: '',
    books: []
  });

  const [selectedBooks, setSelectedBooks] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookSelect = (bookId) => {
    setSelectedBooks(prev => {
      const exists = prev.find(b => b.book_id === bookId);
      if (exists) {
        return prev.filter(b => b.book_id !== bookId);
      } else {
        return [...prev, { book_id: bookId, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (bookId, quantity) => {
    setSelectedBooks(prev =>
      prev.map(b => b.book_id === bookId ? { ...b, quantity: parseInt(quantity) || 1 } : b)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newSet = {
      id: editingSet ? editingSet.id : Date.now(),
      ...formData,
      books: selectedBooks,
      board_name: mockBoards.find(b => b.id === parseInt(formData.board_id))?.name,
      medium_name: mockMediums.find(m => m.id === parseInt(formData.medium_id))?.name,
      class_name: mockClasses.find(c => c.id === parseInt(formData.class_id))?.name,
      year_name: mockYears.find(y => y.id === parseInt(formData.year_id))?.name
    };

    if (editingSet) {
      setBookSets(prev => prev.map(set => set.id === editingSet.id ? newSet : set));
    } else {
      setBookSets(prev => [...prev, newSet]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      board_id: '',
      medium_id: '',
      class_id: '',
      year_id: '',
      set_name: '',
      books: []
    });
    setSelectedBooks([]);
    setShowForm(false);
    setEditingSet(null);
  };

  const handleEdit = (set) => {
    setEditingSet(set);
    setFormData({
      board_id: set.board_id,
      medium_id: set.medium_id,
      class_id: set.class_id,
      year_id: set.year_id,
      set_name: set.set_name
    });
    setSelectedBooks(set.books);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book set?')) {
      setBookSets(prev => prev.filter(set => set.id !== id));
    }
  };

  const filteredBookSets = bookSets.filter(set => {
    return (!filters.board_id || set.board_id === parseInt(filters.board_id)) &&
           (!filters.medium_id || set.medium_id === parseInt(filters.medium_id)) &&
           (!filters.class_id || set.class_id === parseInt(filters.class_id)) &&
           (!filters.year_id || set.year_id === parseInt(filters.year_id));
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Book Inventory Management</h1>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              Create Book Set
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Board</label>
              <select
                value={filters.board_id}
                onChange={(e) => setFilters(prev => ({ ...prev, board_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Boards</option>
                {mockBoards.map(board => (
                  <option key={board.id} value={board.id}>{board.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medium</label>
              <select
                value={filters.medium_id}
                onChange={(e) => setFilters(prev => ({ ...prev, medium_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Mediums</option>
                {mockMediums.map(medium => (
                  <option key={medium.id} value={medium.id}>{medium.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select
                value={filters.class_id}
                onChange={(e) => setFilters(prev => ({ ...prev, class_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Classes</option>
                {mockClasses.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                value={filters.year_id}
                onChange={(e) => setFilters(prev => ({ ...prev, year_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Years</option>
                {mockYears.map(year => (
                  <option key={year.id} value={year.id}>{year.name}</option>
                ))}
              </select>
            </div>
          </div>

      
          <div className="space-y-4">
            {filteredBookSets.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No book sets found</p>
                <p className="text-sm">Create your first book set to get started</p>
              </div>
            ) : (
              filteredBookSets.map(set => (
                <div key={set.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{set.set_name}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div><span className="font-medium">Board:</span> {set.board_name}</div>
                        <div><span className="font-medium">Medium:</span> {set.medium_name}</div>
                        <div><span className="font-medium">Class:</span> {set.class_name}</div>
                        <div><span className="font-medium">Year:</span> {set.year_name}</div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Total Books:</span> {set.books.length}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setExpandedSet(expandedSet === set.id ? null : set.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                        title="View Books"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleEdit(set)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                        title="Edit"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(set.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  
                  {expandedSet === set.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-2">Books in this set:</h4>
                      <div className="space-y-2">
                        {set.books.map(book => {
                          const bookDetails = mockBooks.find(b => b.id === book.book_id);
                          return (
                            <div key={book.book_id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                              <div>
                                <p className="font-medium text-gray-800">{bookDetails?.book_name}</p>
                                <p className="text-sm text-gray-600">
                                  {bookDetails?.subject} | {bookDetails?.publisher}
                                </p>
                              </div>
                              <div className="text-sm text-gray-600">
                                Qty: <span className="font-semibold">{book.quantity}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {editingSet ? 'Edit Book Set' : 'Create New Book Set'}
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Board *</label>
                      <select
                        name="board_id"
                        value={formData.board_id}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Board</option>
                        {mockBoards.map(board => (
                          <option key={board.id} value={board.id}>{board.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Medium *</label>
                      <select
                        name="medium_id"
                        value={formData.medium_id}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Medium</option>
                        {mockMediums.map(medium => (
                          <option key={medium.id} value={medium.id}>{medium.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                      <select
                        name="class_id"
                        value={formData.class_id}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Class</option>
                        {mockClasses.map(cls => (
                          <option key={cls.id} value={cls.id}>{cls.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year *</label>
                      <select
                        name="year_id"
                        value={formData.year_id}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Year</option>
                        {mockYears.map(year => (
                          <option key={year.id} value={year.id}>{year.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Set Name *</label>
                    <input
                      type="text"
                      name="set_name"
                      value={formData.set_name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Class 3 English Medium Set"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Books *</label>
                    <div className="border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto">
                      {mockBooks.map(book => {
                        const isSelected = selectedBooks.find(b => b.book_id === book.id);
                        return (
                          <div key={book.id} className="flex items-center gap-3 mb-3 p-2 hover:bg-gray-50 rounded">
                            <input
                              type="checkbox"
                              checked={!!isSelected}
                              onChange={() => handleBookSelect(book.id)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{book.book_name}</p>
                              <p className="text-sm text-gray-600">{book.subject} - {book.publisher}</p>
                            </div>
                            {isSelected && (
                              <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600">Qty:</label>
                                <input
                                  type="number"
                                  min="1"
                                  value={isSelected.quantity}
                                  onChange={(e) => handleQuantityChange(book.id, e.target.value)}
                                  className="w-16 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {selectedBooks.length > 0 && (
                      <p className="text-sm text-gray-600 mt-2">
                        {selectedBooks.length} book(s) selected
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={selectedBooks.length === 0}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {editingSet ? 'Update Book Set' : 'Create Book Set'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;