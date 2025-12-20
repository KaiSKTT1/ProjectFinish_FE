import api from "../utils/api"

// Tạo đơn hàng từ giỏ hàng (POST /orders/create-order)
export const createOrderFromCart = async (orderRequest) => {
    try {
        const response = await api.post('/orders/create-order', orderRequest);
        return response.data.result || response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

// Tạo đơn hàng mới (mua khóa học) - legacy
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

// Lấy tất cả đơn hàng (Admin) - API trả về mảng
export const getAllOrders = async () => {
    try {
        const response = await api.get('/orders');
        return response.data.result || response.data;
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
};

// Lấy chi tiết đơn hàng - danh sách khóa học trong order (GET /orders/{orderId})
export const getOrderDetailCourses = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data.result || response.data;
    } catch (error) {
        console.error('Error fetching order detail courses:', error);
        throw error;
    }
};

// Legacy - giữ để tương thích
export const getOrderById = getOrderDetailCourses;

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
