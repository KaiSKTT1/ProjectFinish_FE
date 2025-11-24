import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourse, updateCourse } from "../../services/courseService";
import { getCategories } from "../../services/categoryService";

const EditCoursePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingCourse, setFetchingCourse] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        categoryId: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchCategories();
        fetchCourse();
    }, [id]);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    const fetchCourse = async () => {
        try {
            setFetchingCourse(true);
            const course = await getCourse(id);
            setFormData({
                name: course.name || "",
                description: course.description || "",
                categoryId: course.category?.id || ""
            });
        } catch (error) {
            console.error("Failed to fetch course:", error);
            alert("Không tìm thấy khóa học!");
            navigate('/admin/courses');
        } finally {
            setFetchingCourse(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Tên khóa học không được để trống";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Mô tả không được để trống";
        }

        if (!formData.categoryId) {
            newErrors.categoryId = "Vui lòng chọn danh mục";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            setLoading(true);
            await updateCourse(id, {
                name: formData.name,
                description: formData.description,
                categoryId: formData.categoryId
            });
            alert("Cập nhật khóa học thành công!");
            navigate('/admin/courses');
        } catch (error) {
            console.error("Failed to update course:", error);
            alert("Cập nhật khóa học thất bại! " + (error.response?.data?.message || ""));
        } finally {
            setLoading(false);
        }
    };

    if (fetchingCourse) {
        return (
            <div className="text-center py-12">
                <p className="text-xl text-gray-600">Đang tải dữ liệu khóa học...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/admin/courses')}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    ← Quay lại
                </button>
                <h1 className="text-3xl font-bold">Chỉnh sửa khóa học</h1>
            </div>

            <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tên khóa học */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên khóa học <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Nhập tên khóa học"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Danh mục */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Danh mục <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.categoryId ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <option value="">-- Chọn danh mục --</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && (
                            <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
                        )}
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mô tả <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={5}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Nhập mô tả khóa học"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-1 py-3 rounded-lg font-medium text-white ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                        >
                            {loading ? 'Đang cập nhật...' : '✅ Cập nhật'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/courses')}
                            className="flex-1 py-3 bg-gray-200 rounded-lg font-medium hover:bg-gray-300"
                        >
                            ❌ Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCoursePage;
