import apiClient from './client';

export const getPackages = async () => {
    try {
        const response = await apiClient.get('/packages');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

export const createPackage = async (data) => {
    try {
        const response = await apiClient.post('/packages', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

export const updatePackage = async (data) => {
    try {
        const response = await apiClient.put('/packages', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

export const deletePackage = async (id) => {
    try {
        const response = await apiClient.delete(`/packages?id=${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};
