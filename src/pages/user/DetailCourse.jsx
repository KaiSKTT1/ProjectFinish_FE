import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourse } from "../../services/courseService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const DetailCourse = () => {
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const checkLogin = localStorage.getItem('token'); // Kiểm tra login

    // Lấy state từ Redux
    const addingCourse = useSelector((state) => state.cart.addingCourse);
    const isAdding = addingCourse === course?.name;

    const handleClickBuyCourse = async () => {
        if (!checkLogin) {
            alert('Vui lòng đăng nhập để mua khóa học!');
            navigate('/login');
            return;
        }

        if (!course) {
            alert('Không tìm thấy thông tin khóa học!');
            return;
        }

        try {
            // Dispatch Redux action
            await dispatch(addToCart(course.name)).unwrap();

            // Thông báo và chuyển đến giỏ hàng
            alert(`✅ Đã thêm "${course.name}" vào giỏ hàng!`);
            navigate('/cart');

        } catch (error) {
            console.error('Add to cart error:', error);

            if (error.includes('401')) {
                alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!');
                navigate('/login');
            } else {
                alert(`Lỗi: ${error}`);
            }
        }
    }

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

                <button
                    onClick={handleClickBuyCourse}
                    disabled={isAdding}
                    className={`mt-6 px-6 py-3 rounded transition-colors ${isAdding
                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                >
                    {isAdding ? '⏳ Đang thêm...' : '🛒 Thêm vào giỏ hàng'}
                </button>
            </div>
        </div>
    );
};

export default DetailCourse;