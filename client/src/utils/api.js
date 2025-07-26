// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API helper functions

export const getProblemById = (id) => api.get(`/problem/${id}`);
export const createSubmission = (data) => api.post('/submit', data);
export const runCode = (data) => api.post('/run', data);

export default api;
