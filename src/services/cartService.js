import api from '../utils/api';

// Thêm khóa học vào giỏ hàng
// Backend expect: { nameCourse: "string" } - TÊN khóa học, không phải ID!
export const addToCart = async (courseName) => {
    try {
        const response = await api.post('/cart', { nameCourse: courseName });
        return response.data.result || response.data;
    } catch (error) {
        console.error('Add to cart error:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Lấy giỏ hàng của user
export const getMyCart = async () => {
    try {
        const response = await api.get('/cart/myCart');
        return response.data.result || [];
    } catch (error) {
        console.error('Get cart error:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Xóa khóa học khỏi giỏ hàng
export const removeFromCart = async (courseId) => {
    try {
        const response = await api.delete(`/cart/${courseId}`);
        return response.data.result || response.data;
    } catch (error) {
        console.error('Remove from cart error:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Xóa toàn bộ giỏ hàng
export const clearCart = async () => {
    try {
        const response = await api.delete('/cart/clear');
        return response.data.result || response.data;
    } catch (error) {
        console.error('Clear cart error:', error.response?.data?.message || error.message);
        throw error;
    }
};
