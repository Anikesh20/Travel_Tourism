import apiClient from './client';

export const getSettings = async () => {
    try {
        const response = await apiClient.get('/settings');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

export const updateSettings = async (settings) => {
    try {
        const response = await apiClient.post('/settings', settings);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

export const updateProfile = async (id, username, password) => {
    try {
        const response = await apiClient.post('/auth/update-profile', { id, username, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};
