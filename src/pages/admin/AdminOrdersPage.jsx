import { useState, useEffect } from "react";
import { getAllOrders } from "../../services/orderService";

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchOrders();
    }, [currentPage]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getAllOrders(currentPage, 10);
            console.log("🛍️ Orders data:", data);
            setOrders(data.content || data || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("❌ Failed to fetch orders:", error);
            console.warn("⚠️ Backend chưa có API GET /orders?page=1&size=10");
            setOrders([]);
        } finally {
            setLoading(false);
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
            <h1 className="text-3xl font-bold mb-6">Quản lý đơn hàng</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã đơn</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Người mua</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khóa học</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày mua</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-500">{order.id?.substring(0, 8)}...</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.userName || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{order.courseName || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                            Thành công
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center">
                                    <div className="text-gray-500">
                                        <p className="text-xl mb-2">📦 Không có đơn hàng nào</p>
                                        <p className="text-sm text-gray-400">
                                            ⚠️ Nếu backend chưa có API <code>GET /orders</code>, vui lòng thêm endpoint
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${currentPage === 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-white border hover:bg-gray-50'
                            }`}
                    >
                        ← Trước
                    </button>
                    <span className="px-4 py-2 text-sm text-gray-600">
                        Trang {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded ${currentPage === totalPages
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

export default AdminOrdersPage;
