import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
    baseURL: 'http://localhost:8080/identity',
    timeout: 10000,
    headers: { 'content-type': 'application/json' }
});

// Helper: Kiểm tra token có hết hạn không
const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
};

// Interceptor: Tự động thêm JWT token vào mỗi request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Kiểm tra token có hết hạn không
            if (isTokenExpired(token)) {
                console.error('❌ Token đã hết hạn! Vui lòng đăng nhập lại.');
                localStorage.removeItem('token');
                localStorage.removeItem('userScope');
                window.location.href = '/login';
                return Promise.reject(new Error('Token expired'));
            }

            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor: Xử lý response errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.warn('Unauthorized - Token may be invalid or expired');
        }
        return Promise.reject(error);
    }
);

export default api;
