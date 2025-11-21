import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../store/cartSlice";
import { createOrder } from "../../services/orderService";
import { removeFromCart, clearCart } from "../../services/cartService";

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Lấy data từ Redux store
    const cartItems = useSelector((state) => state.cart.items);
    const loading = useSelector((state) => state.cart.loading);

    const [total, setTotal] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    // Load cart từ Redux khi component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(fetchCart());
        }
    }, [dispatch]);

    // Tính tổng tiền khi cart thay đổi
    useEffect(() => {
        const totalPrice = cartItems.reduce((sum, item) => {
            return sum + (parseFloat(item.course?.price) || 0);
        }, 0);
        setTotal(totalPrice);
    }, [cartItems]);

    // Xóa item khỏi cart
    const handleRemoveItem = async (courseId) => {
        try {
            await removeFromCart(courseId);

            // Refetch cart từ Redux
            dispatch(fetchCart());

            alert('✅ Đã xóa khỏi giỏ hàng!');
        } catch (error) {
            console.error('Remove item error:', error);
            alert('Không thể xóa khóa học. Vui lòng thử lại!');
        }
    };

    // Xóa toàn bộ cart
    const handleClearCart = async () => {
        if (!window.confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
            return;
        }

        try {
            await clearCart();

            // Refetch cart từ Redux
            dispatch(fetchCart());

            alert('✅ Đã xóa toàn bộ giỏ hàng!');
        } catch (error) {
            console.error('Clear cart error:', error);
            alert('Không thể xóa giỏ hàng. Vui lòng thử lại!');
        }
    };

    // Thanh toán
    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert('Giỏ hàng trống!');
            return;
        }

        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Vui lòng đăng nhập để mua khóa học!');
            navigate('/login');
            return;
        }

        try {
            setIsProcessing(true);

            // Lấy danh sách course IDs từ cart (lưu ý: data từ API có structure {course: {...}})
            const courseIds = cartItems.map(item => item.course?.id);
            console.log('Creating order with course IDs:', courseIds);

            // Gọi API tạo đơn hàng
            const order = await createOrder(courseIds);
            console.log('Order created:', order);

            // Thông báo thành công
            alert(`✅ Mua hàng thành công!\n\nBạn đã mua ${cartItems.length} khóa học.\nTổng: ${total.toLocaleString('vi-VN')}đ\n\nĐơn hàng #${order.id || 'XXX'}`);

            // Clear cart sau khi thanh toán thành công
            await handleClearCart();

            // Navigate đến trang "Khóa học của tôi"
            navigate('/my-courses');

        } catch (error) {
            console.error('Checkout error:', error);

            // Xử lý các lỗi cụ thể
            if (error.response?.status === 401) {
                alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!');
                navigate('/login');
            } else if (error.response?.data?.message) {
                alert(`Lỗi: ${error.response.data.message}`);
            } else {
                alert('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại!');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    // Tiếp tục mua sắm
    const handleContinueShopping = () => {
        navigate('/courses');
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Giỏ hàng của bạn</h1>

            {loading ? (
                <div className="text-center py-16">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="text-gray-600">Đang tải giỏ hàng...</p>
                </div>
            ) : cartItems.length === 0 ? (
                // Empty cart
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                        Giỏ hàng trống
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Bạn chưa thêm khóa học nào vào giỏ hàng
                    </p>
                    <Button
                        title="Khám phá khóa học"
                        onClick={handleContinueShopping}
                    />
                </div>
            ) : (
                // Cart with items
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Cart items list */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md">
                            {cartItems.map((item, index) => {
                                const course = item.course; // Lấy course từ response API
                                return (
                                    <div
                                        key={course?.id || index}
                                        className="flex items-center gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50"
                                    >
                                        {/* Course info */}
                                        <div
                                            className="flex-1 cursor-pointer"
                                            onClick={() => navigate(`/courses/${course?.id}`)}
                                        >
                                            <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                                                {course?.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {course?.category?.name || 'Chưa phân loại'}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                                {course?.description}
                                            </p>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-blue-600">
                                                {(parseFloat(course?.price) || 0).toLocaleString('vi-VN')}đ
                                            </p>
                                        </div>

                                        {/* Remove button */}
                                        <button
                                            onClick={() => handleRemoveItem(course?.id)}
                                            className="text-red-500 hover:text-red-700 p-2"
                                            title="Xóa khỏi giỏ hàng"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Clear all button */}
                        <div className="mt-4">
                            <button
                                onClick={handleClearCart}
                                className="text-red-500 hover:text-red-700 font-medium"
                            >
                                🗑️ Xóa toàn bộ giỏ hàng
                            </button>
                        </div>
                    </div>

                    {/* Right: Order summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h2 className="text-2xl font-bold mb-6">Tóm tắt đơn hàng</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Số khóa học:</span>
                                    <span className="font-semibold">{cartItems.length}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Tạm tính:</span>
                                    <span className="font-semibold">
                                        {total.toLocaleString('vi-VN')}đ
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Giảm giá:</span>
                                    <span className="font-semibold text-green-600">-0đ</span>
                                </div>

                                <div className="border-t pt-3 mt-3">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Tổng cộng:</span>
                                        <span className="text-blue-600">
                                            {total.toLocaleString('vi-VN')}đ
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={handleCheckout}
                                    disabled={isProcessing}
                                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${isProcessing
                                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    {isProcessing ? '⏳ Đang xử lý...' : '💳 Thanh toán'}
                                </button>

                                <button
                                    onClick={handleContinueShopping}
                                    className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Tiếp tục mua sắm
                                </button>
                            </div>

                            {/* Promo code */}
                            <div className="mt-6 pt-6 border-t">
                                <p className="text-sm text-gray-600 mb-2">Mã giảm giá</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Nhập mã giảm giá"
                                        className="flex-1 px-3 py-2 border rounded-lg text-sm"
                                    />
                                    <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300">
                                        Áp dụng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
