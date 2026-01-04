import apiClient from './client';

export const login = async (username, password) => {
    try {
        const response = await apiClient.post('/auth/login', { username, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};
