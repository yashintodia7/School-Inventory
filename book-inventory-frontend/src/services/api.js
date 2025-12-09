import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Board APIs
export const getBoards = () => api.get('/boards');
export const createBoard = (data) => api.post('/boards', data);

// Medium APIs
export const getMediums = () => api.get('/mediums');
export const createMedium = (data) => api.post('/mediums', data);

// Class APIs
export const getClasses = () => api.get('/classes');
export const createClass = (data) => api.post('/classes', data);

// Year APIs
export const getYears = () => api.get('/years');
export const createYear = (data) => api.post('/years', data);

// Book APIs
export const getBooks = () => api.get('/books');
export const createBook = (data) => api.post('/books', data);

// BookSet APIs
export const getBookSets = (params) => api.get('/book-sets', { params });
export const getBookSetById = (id) => api.get(`/book-sets/${id}`);
export const createBookSet = (data) => api.post('/book-sets/create', data);
export const updateBookSet = (id, data) => api.put(`/book-sets/${id}`, data);
export const deleteBookSet = (id) => api.delete(`/book-sets/${id}`);

export default api;