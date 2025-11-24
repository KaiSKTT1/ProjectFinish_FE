import api from "../utils/api"

// Lấy tất cả các danh mục
export const getCategories = async () => {
    try {
        const response = await api.get('/categories');
        console.log("📁 Categories API Response:", response.data);
        // Backend có thể trả về {code: 1000, result: [...]}
        return response.data.result || response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

// Tạo danh mục mới (Admin)
export const createCategory = async (categoryData) => {
    const response = await api.post('/categories', categoryData);
    return response.data.result || response.data;
}

// Cập nhật danh mục (Admin)
export const updateCategory = async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data.result || response.data;
}

// Xóa danh mục (Admin)
export const deleteCategory = async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
}