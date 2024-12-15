import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const getDishes = (params) => axios.get(`${API_BASE_URL}/api/dishes`, { params });

export const getDishDetails = (id) => axios.get(`${API_BASE_URL}/dishes/${id}`);

export const searchDishes = (query) => axios.get(`${API_BASE_URL}/search`, { params: { query } });
