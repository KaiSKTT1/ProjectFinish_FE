import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCourses, deleteCourse } from "../../services/courseService";

const AdminCoursesPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10);
    // Lấy page từ query param, mặc định là 1
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);

    // Khi pageFromUrl thay đổi, fetch dữ liệu
    useEffect(() => {
        fetchCourses(pageFromUrl);
    }, [pageFromUrl]);

    const fetchCourses = async (page) => {
        try {
            setLoading(true);
            const data = await getCourses(page, pageSize);
            setCourses(Array.isArray(data.content) ? data.content : []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (courseId, courseName) => {
        if (window.confirm(`Bạn có chắc muốn xóa khóa học "${courseName}"?`)) {
            try {
                await deleteCourse(courseId);
                alert("Xóa khóa học thành công!");
                fetchCourses(pageFromUrl); // Refresh list
            } catch (error) {
                console.error("Failed to delete course:", error);
                alert("Xóa khóa học thất bại!");
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
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Quản lý khóa học</h1>
                <button
                    onClick={() => navigate('/admin/courses/create')}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center gap-2"
                >
                    <span>➕</span>
                    Thêm khóa học mới
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên khóa học</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Danh mục</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mô tả</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-500">{course.id.substring(0, 8)}...</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{course.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{course.category?.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {course.description?.substring(0, 50)}...
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => navigate(`/admin/courses/edit/${course.id}`)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                                        >
                                            ✏️ Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course.id, course.name)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            🗑️ Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                    Không có khóa học nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => setSearchParams({ page: Math.max(1, pageFromUrl - 1) })}
                        disabled={pageFromUrl === 1}
                        className={`px-4 py-2 rounded ${pageFromUrl === 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-white border hover:bg-gray-50'
                            }`}
                    >
                        ← Trước
                    </button>

                    <span className="px-4 py-2 text-sm text-gray-600">
                        Trang {pageFromUrl} / {totalPages}
                    </span>

                    <button
                        onClick={() => setSearchParams({ page: Math.min(totalPages, pageFromUrl + 1) })}
                        disabled={pageFromUrl === totalPages}
                        className={`px-4 py-2 rounded ${pageFromUrl === totalPages
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-white border hover:bg-gray-50'
                            }`}
                    >
                        Sau →
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminCoursesPage;
