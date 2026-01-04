import apiClient from './client';

export const getUsers = async () => {
    try {
        const response = await apiClient.get('/users');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};
