import api from "../utils/api"

//Lấy tất cả các danh mục
export const getCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}