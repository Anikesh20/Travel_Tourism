import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const dashboardService = {
    getStats: async () => {
        const response = await api.get('stats');
        return response.data;
    },
};

export const enquiryService = {
    getAll: async () => {
        const response = await api.get('enquiries');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('enquiries', data);
        return response.data;
    },
    updateStatus: async (id, status) => {
        const response = await api.put('enquiries', { id, status });
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`enquiries?id=${id}`);
        return response.data;
    },
};

export const packageService = {
    getAll: async () => {
        const response = await api.get('packages');
        return response.data;
    },
};

export const newsletterService = {
    subscribe: async (email) => {
        const response = await api.post('newsletter', { email });
        return response.data;
    },
    getAll: async () => {
        const response = await api.get('newsletter');
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`newsletter/${id}`);
        return response.data;
    }
};

export default api;
