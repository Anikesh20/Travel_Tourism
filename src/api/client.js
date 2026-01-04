import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost/Travel and tourism/api/index.php',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
