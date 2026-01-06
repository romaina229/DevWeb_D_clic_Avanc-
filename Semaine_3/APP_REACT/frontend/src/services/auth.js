import axios from 'axios';

        // Configuration axios
        const api = axios.create({
            baseURL: 'http://localhost:8000', // URL de ton backend Laravel
            withCredentials: true,            // nécessaire pour les cookies CSRF/Sanctum
        });

        // Récupérer le CSRF token avant toute requête POST
        export const getCsrfToken = async () => {
            await api.get('/sanctum/csrf-cookie');
        };

        export const authService = {
            login: async (email, password) => {
                await getCsrfToken(); // assure que le CSRF token est présent
                const response = await api.post('/api/v1/login', { email, password });
                return response.data;
            },

            register: async (userData) => {
                await getCsrfToken(); // CSRF token pour l'inscription
                const response = await api.post('/api/v1/register', userData);
                return response.data;
            },

            logout: async () => {
                const response = await api.post('/api/v1/logout');
                return response.data;
            }
                        
        };
