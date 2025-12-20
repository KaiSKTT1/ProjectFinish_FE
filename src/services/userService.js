import api from "../utils/api"

// Lấy danh sách tất cả users (Admin)
export const getAllUsers = async (page = 1, size = 10) => {
    const response = await api.get('/users', {
        params: { page, size }
    });
    return response.data.result || response.data;
}

// Lấy thông tin user theo ID (Admin)
export const getUserById = async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data.result || response.data;
}

// Xóa user (Admin)
export const deleteUser = async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
}

// Lấy thông tin user hiện tại (GET /users/myInfo)
export const getMyInfo = async () => {
    try {
        const response = await api.get('/users/myInfo');
        return response.data.result || response.data;
    } catch (error) {
        console.error('Error fetching my info:', error);
        throw error;
    }
}
