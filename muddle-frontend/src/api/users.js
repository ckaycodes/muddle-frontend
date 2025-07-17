import api from './api';

export const createUser = (userData) => api.post('/users', userData);
export const getAllUsers = () => api.get('/users');
