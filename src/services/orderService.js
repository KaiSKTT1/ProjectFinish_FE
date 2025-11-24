import api from "../utils/api"

// Tạo đơn hàng mới (mua khóa học)
export const createOrder = async (courseIds) => {
    try {
        const response = await api.post('/orders', {
            courseIds: courseIds  // Array of course IDs
        });
        return response.data.result || response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

// Lấy danh sách đơn hàng của user
export const getMyOrders = async () => {
    try {
        const response = await api.get('/orders/my-orders');
        return response.data.result || response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Lấy tất cả đơn hàng (Admin)
export const getAllOrders = async (page = 1, size = 10) => {
    const response = await api.get('/orders', {
        params: { page, size }
    });
    return response.data.result || response.data;
};

// Lấy chi tiết một đơn hàng
export const getOrderById = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data.result || response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

// Lấy danh sách khóa học đã mua
export const getMyCourses = async () => {
    try {
        const response = await api.get('/orders/my-courses');
        return response.data.result || response.data;
    } catch (error) {
        console.error('Error fetching my courses:', error);
        throw error;
    }
};
