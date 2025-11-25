import { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../../services/userService";
import { useSearchParams } from "react-router-dom";

const AdminUsersPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    // Lấy page và size từ URL, mặc định page=1, size=10
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
    const sizeFromUrl = parseInt(searchParams.get('size') || '10', 10);

    useEffect(() => {
        fetchUsers(pageFromUrl, sizeFromUrl);
    }, [pageFromUrl, sizeFromUrl]);

    const fetchUsers = async (page, size) => {
        try {
            setLoading(true);
            const data = await getAllUsers(page, size);
            setUsers(Array.isArray(data.content) ? data.content : []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("❌ Failed to fetch users:", error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId, userName) => {
        if (window.confirm(`Bạn có chắc muốn xóa người dùng "${userName}"?`)) {
            try {
                await deleteUser(userId);
                alert("Xóa người dùng thành công!");
                fetchUsers(pageFromUrl, sizeFromUrl);
            } catch (error) {
                console.error("Failed to delete user:", error);
                alert("Xóa người dùng thất bại!");
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
            <h1 className="text-3xl font-bold mb-6">Quản lý người dùng</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-500">{user.id?.substring(0, 8)}...</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.username}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{user.email || 'N/A'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'ADMIN'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {user.role || 'USER'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleDelete(user.id, user.username)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            disabled={user.role === 'ADMIN'}
                                        >
                                            🗑️ Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center">
                                    <div className="text-gray-500">
                                        <p className="text-xl mb-2">👥 Không có người dùng nào</p>
                                        <p className="text-sm text-gray-400">
                                            ⚠️ Nếu backend chưa có API <code>GET /users</code>, vui lòng thêm endpoint
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
                        onClick={() => setSearchParams({ page: Math.max(1, pageFromUrl - 1), size: sizeFromUrl })}
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
                        onClick={() => setSearchParams({ page: Math.min(totalPages, pageFromUrl + 1), size: sizeFromUrl })}
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

            {/* Chọn số lượng trên mỗi trang */}
            <div className="flex justify-end items-center mt-4">
                <label className="mr-2 text-sm text-gray-600">Hiển thị mỗi trang:</label>
                <select
                    value={sizeFromUrl}
                    onChange={e => setSearchParams({ page: 1, size: e.target.value })}
                    className="px-2 py-1 border rounded"
                >
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
        </div>
    );
};

export default AdminUsersPage;
