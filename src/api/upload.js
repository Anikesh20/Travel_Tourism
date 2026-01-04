import apiClient from './client';

export const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await apiClient.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};
