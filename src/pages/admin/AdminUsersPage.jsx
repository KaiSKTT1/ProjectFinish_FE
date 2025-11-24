import { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../../services/userService";

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers(currentPage, 10);
            console.log("👥 Users data:", data);
            setUsers(data.content || data || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("❌ Failed to fetch users:", error);
            console.warn("⚠️ Backend chưa có API GET /users?page=1&size=10");
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
                fetchUsers();
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

export default AdminUsersPage;
