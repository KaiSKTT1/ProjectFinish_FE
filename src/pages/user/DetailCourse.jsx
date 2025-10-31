import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourse } from "../../services/courseService";

const DetailCourse = () => {
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Kiểm tra nếu không có id → redirect về trang chủ
        if (!id) {
            console.error('No course ID provided');
            navigate('/');
            return;
        }

        const fetchCourseDetail = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('Fetching course with id:', id); // Debug
                const data = await getCourse(id);
                console.log('Course data:', data); // Debug
                setCourse(data);
            } catch (error) {
                console.error('Failed to fetch course detail:', error);
                setError(error.response?.data?.message || error.message || 'Lỗi khi tải khóa học');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetail();
    }, [id, navigate]);

    if (loading) {
        return <div className="text-center p-4">Đang tải...</div>;
    }

    if (error) {
        return (
            <div className="text-center p-4">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Về trang chủ
                </button>
            </div>
        );
    }

    if (!course) {
        return <div className="text-center p-4">Không tìm thấy khóa học</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 mb-2">Danh mục: {course.category?.name || course.category}</p>
                <p className="text-gray-800 mb-4">{course.description}</p>
                <p className="text-2xl font-bold text-blue-600">Giá: {course.price || '1,000,000'} VNĐ</p>

                <button className="mt-6 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
                    Mua khóa học
                </button>
            </div>
        </div>
    );
};

export default DetailCourse;