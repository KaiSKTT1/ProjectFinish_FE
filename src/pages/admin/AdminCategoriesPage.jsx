import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, deleteCategory } from "../../services/categoryService";

const AdminCategoriesPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await getCategories();
            console.log("📦 Categories data received:", data);
            console.log("📦 Is array?", Array.isArray(data));
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (categoryId, categoryName) => {
        if (window.confirm(`Bạn có chắc muốn xóa danh mục "${categoryName}"?`)) {
            try {
                await deleteCategory(categoryId);
                alert("Xóa danh mục thành công!");
                fetchCategories();
            } catch (error) {
                console.error("Failed to delete category:", error);
                alert("Xóa danh mục thất bại!");
            }
        }
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <p className="text-xl text-gray-600">Đang tải...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Quản lý danh mục</h1>
                <button
                    onClick={() => navigate('/admin/categories/create')}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium flex items-center gap-2"
                >
                    <span>➕</span>
                    Thêm danh mục mới
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                                <span className="text-2xl">📁</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/admin/categories/edit/${category.id}`)}
                                    className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                                >
                                    ✏️ Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id, category.name)}
                                    className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                >
                                    🗑️ Xóa
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        Không có danh mục nào
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCategoriesPage;
