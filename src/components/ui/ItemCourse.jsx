import { H3, H4 } from "./Typography";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const ItemCourse = ({ course, onClick }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Lấy state từ Redux store
    const addingCourse = useSelector((state) => state.cart.addingCourse);
    const isAdding = addingCourse === course.name;

    const handleClickShowDetail = () => {
        console.log('Course clicked:', course); // Debug: xem course object

        // Lấy id từ các field có thể (id, courseId, code, _id)
        const courseId = course.id || course.courseId || course.code || course._id;
        console.log('Course ID:', courseId);   // Debug: xem id

        if (!courseId) {
            console.error('Course không có id!', course);
            alert('Lỗi: Course không có ID');
            return;
        }

        navigate(`/courses/${courseId}`);
    }

    const handleAddToCart = async (e) => {
        e.stopPropagation(); // Ngăn event bubble lên div cha

        // Kiểm tra đăng nhập
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Vui lòng đăng nhập để thêm vào giỏ hàng!');
            navigate('/login');
            return;
        }

        try {
            // Dispatch Redux action - Redux tự động handle loading state
            const result = await dispatch(addToCart(course.name)).unwrap();

            alert(`✅ Đã thêm "${course.name}" vào giỏ hàng!`);
        } catch (error) {
            console.error('Add to cart error:', error);

            // Error message đã được Redux xử lý
            if (error.includes('401')) {
                alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!');
                navigate('/login');
            } else {
                alert(`Lỗi: ${error}`);
            }
        }
    };

    return (
        <div onClick={handleClickShowDetail} className="cursor-pointer hover:shadow-lg hover:bg-gray-300 p-4 rounded-lg transition-all">
            <H3>
                <span className="text-blue-600 text-sm">{course.category?.name || course.category}</span>
                <hr className="my-2" />
                <span className="text-gray-800">{course.name}</span>
            </H3>
            <H4 className="text-gray-600 line-clamp-2">{course.description}</H4>
            <H3 className="text-2xl font-bold text-green-600 my-3">
                <span>{(parseFloat(course.price) || 1000).toLocaleString('vi-VN')}đ</span>
            </H3>
            <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                style={{
                    cursor: isAdding ? 'not-allowed' : 'pointer',
                    opacity: isAdding ? 0.6 : 1
                }}
            >
                {isAdding ? '⏳ Đang thêm...' : '🛒 Thêm vào giỏ hàng'}
            </Button>
        </div >
    )
}

export default ItemCourse;