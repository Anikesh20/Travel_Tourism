import apiClient from './client';

export const getTestimonials = async () => {
    try {
        const response = await apiClient.get('/testimonials');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

export const createTestimonial = async (data) => {
    try {
        const response = await apiClient.post('/testimonials', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

export const updateTestimonial = async (data) => {
    try {
        const response = await apiClient.put('/testimonials', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

export const deleteTestimonial = async (id) => {
    try {
        const response = await apiClient.delete(`/testimonials?id=${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};
