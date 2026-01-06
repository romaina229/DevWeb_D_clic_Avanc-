// src/services/api.js
import axios from 'axios';

axios.defaults.baseURL ='http://127.0.0.1:8000/api/v1';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';


const API_URL = 'http://127.0.0.1:8000/api/v1'; // URL de votre Laravel

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;