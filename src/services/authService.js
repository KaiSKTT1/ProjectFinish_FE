import api from "../utils/api";

// Login
export const login = async (credentials) => {
    const response = await api.post('/auth/token', credentials);
    return response.data.result || response.data;
};

// Logout
export const logout = async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    return response.data;
};

// Introspect (kiểm tra token)
export const introspect = async (token) => {
    const response = await api.post('/auth/introspect', { token });
    return response.data.result || response.data;
};
