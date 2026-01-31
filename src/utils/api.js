import axios from 'axios';
import API_BASE_URL from '../config/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true // Important for sending cookies
});

// Request interceptor for adding the token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling token expiration
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(`${API_BASE_URL}/api/auth/refresh-token`, {}, { withCredentials: true });
                const { token } = res.data;

                localStorage.setItem('token', token);
                api.defaults.headers.common['x-auth-token'] = token;
                originalRequest.headers['x-auth-token'] = token;

                return api(originalRequest);
            } catch (err) {
                // Refresh token also failed or expired
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/logged-out';
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
