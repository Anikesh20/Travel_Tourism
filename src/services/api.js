import axios from 'axios';

const API_BASE_URL = 'http://localhost/Travel and tourism/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const dashboardService = {
    getStats: async () => {
        const response = await api.get('/stats');
        return response.data;
    },
};

export const enquiryService = {
    getAll: async () => {
        const response = await api.get('/enquiries');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/enquiries', data);
        return response.data;
    },
};

export const packageService = {
    getAll: async () => {
        const response = await api.get('/packages');
        return response.data;
    },
};

export default api;
