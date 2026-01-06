import apiClient from './client';

export const getBookings = async () => {
    try {
        const response = await apiClient.get('/bookings');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

export const createBooking = async (bookingData) => {
    try {
        const response = await apiClient.post('/bookings', bookingData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

export const updateBookingStatus = async (id, status) => {
    try {
        const response = await apiClient.put('/bookings', { id, status });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

export const deleteBooking = async (id) => {
    try {
        const response = await apiClient.delete(`/bookings?id=${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};
