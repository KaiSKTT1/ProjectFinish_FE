import { useState, useEffect } from "react";
import { getMyOrders, getOrderDetailCourses } from "../../services/orderService";

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [detailCourses, setDetailCourses] = useState([]);
    const [loadingDetail, setLoadingDetail] = useState(false);

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const fetchMyOrders = async () => {
        try {
            setLoading(true);
            const data = await getMyOrders();
            console.log("🛍️ My orders data:", data);
            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("❌ Failed to fetch orders:", error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            'PENDING': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chờ xử lý' },
            'COMPLETED': { bg: 'bg-green-100', text: 'text-green-800', label: 'Hoàn thành' },
            'CANCELLED': { bg: 'bg-red-100', text: 'text-red-800', label: 'Đã hủy' },
        };
        const style = statusMap[status] || statusMap['PENDING'];
        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${style.bg} ${style.text}`}>
                {style.label}
            </span>
        );
    };

    const handleViewDetail = async (order) => {
        console.log('📦 Viewing order detail:', order);

        const orderId = order.id || order.orderId;
        console.log('🔑 Order ID:', orderId);

        setSelectedOrder(order);

        if (!orderId) {
            console.warn('⚠️ Order ID not found, using courses from order object');
            setDetailCourses(Array.isArray(order.courses) ? order.courses : []);
            return;
        }

        try {
            setLoadingDetail(true);
            console.log('🔍 Fetching detail courses for order:', orderId);
            const courses = await getOrderDetailCourses(orderId);
            console.log('✅ Detail courses received:', courses);
            setDetailCourses(Array.isArray(courses) ? courses : []);
        } catch (error) {
            console.error('❌ Failed to fetch order details:', error);
            console.log('📌 Using courses from order object as fallback');
            setDetailCourses(Array.isArray(order.courses) ? order.courses : []);
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setDetailCourses([]);
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <p className="text-xl text-gray-600">Đang tải đơn hàng...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Đơn hàng của tôi</h1>

            {orders.length > 0 ? (
                <div className="space-y-4">
                    {orders.map((order, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4 pb-4 border-b">
                                <div>
                                    <p className="text-sm text-gray-500">Ngày đặt hàng</p>
                                    <p className="text-sm font-medium">
                                        {order.createAt ? new Date(order.createAt).toLocaleString('vi-VN') : 'N/A'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
                                    {getStatusBadge(order.statusOrder)}
                                </div>
                            </div>

                            {/* Courses List */}
                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">
                                    Khóa học ({order.courses?.length || 0})
                                </p>
                                <div className="space-y-2">
                                    {order.courses?.map((course, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                                            <span className="text-2xl">📚</span>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {course.name || `Khóa học #${course.id?.substring(0, 8)}`}
                                                </p>
                                                {course.description && (
                                                    <p className="text-xs text-gray-500">
                                                        {course.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="pt-4 border-t space-y-3">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-600">
                                        Tổng cộng
                                    </p>
                                    <p className="text-xl font-bold text-blue-600">
                                        {order.amount?.toLocaleString('vi-VN')} đ
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleViewDetail(order)}
                                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                >
                                    👁️ Xem chi tiết khóa học
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <span className="text-6xl mb-4 block">📦</span>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Chưa có đơn hàng nào
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Bạn chưa mua khóa học nào. Hãy khám phá và chọn khóa học phù hợp với bạn!
                    </p>
                    <a
                        href="/courses"
                        className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                    >
                        Xem khóa học
                    </a>
                </div>
            )}

            {/* Modal chi tiết order */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleCloseModal}>
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-bold">Chi tiết đơn hàng</h2>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700 text-2xl">
                                ×
                            </button>
                        </div>

                        {/* Thông tin đơn hàng */}
                        <div className="mb-4 p-4 bg-gray-50 rounded">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Trạng thái</p>
                                    {getStatusBadge(selectedOrder.statusOrder)}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Tổng tiền</p>
                                    <p className="font-bold text-lg text-blue-600">{selectedOrder.amount?.toLocaleString('vi-VN')} đ</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-500">Ngày tạo</p>
                                    <p className="font-medium">{selectedOrder.createAt ? new Date(selectedOrder.createAt).toLocaleString('vi-VN') : 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Danh sách khóa học chi tiết */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Khóa học chi tiết ({detailCourses.length})</h3>
                            {loadingDetail ? (
                                <p className="text-center py-4 text-gray-500">Đang tải...</p>
                            ) : (
                                <div className="space-y-3">
                                    {detailCourses.map((course, idx) => (
                                        <div key={idx} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-start gap-3">
                                                <span className="text-3xl">📚</span>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900 text-lg">{course.name || 'Không có tên'}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">{course.description || 'Không có mô tả'}</p>
                                                    {course.category && (
                                                        <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                            {course.category.name}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyOrdersPage;
