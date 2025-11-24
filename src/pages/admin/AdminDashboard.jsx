import { useState, useEffect } from "react";
import { getCourses } from "../../services/courseService";
import { getCategories } from "../../services/categoryService";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalCategories: 0,
        totalRevenue: 0,
        totalOrders: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const [coursesData, categoriesData] = await Promise.all([
                    getCourses(1, 1000), // Lấy tất cả courses để đếm
                    getCategories()
                ]);

                setStats({
                    totalCourses: coursesData.totalElements || 0,
                    totalCategories: categoriesData.length || 0,
                    totalRevenue: 0, // TODO: Thêm API tính revenue
                    totalOrders: 0   // TODO: Thêm API đếm orders
                });
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-12">
                <p className="text-xl text-gray-600">Đang tải dữ liệu...</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon="📚"
                    title="Tổng khóa học"
                    value={stats.totalCourses}
                    color="bg-blue-500"
                />
                <StatCard
                    icon="📁"
                    title="Danh mục"
                    value={stats.totalCategories}
                    color="bg-green-500"
                />
                <StatCard
                    icon="🛒"
                    title="Đơn hàng"
                    value={stats.totalOrders}
                    color="bg-purple-500"
                />
                <StatCard
                    icon="💰"
                    title="Doanh thu"
                    value={`${stats.totalRevenue.toLocaleString()} VNĐ`}
                    color="bg-yellow-500"
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Thao tác nhanh</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <QuickAction
                        icon="➕"
                        text="Thêm khóa học"
                        path="/admin/courses/create"
                    />
                    <QuickAction
                        icon="📝"
                        text="Quản lý khóa học"
                        path="/admin/courses"
                    />
                    <QuickAction
                        icon="📁"
                        text="Quản lý danh mục"
                        path="/admin/categories"
                    />
                    <QuickAction
                        icon="🛒"
                        text="Xem đơn hàng"
                        path="/admin/orders"
                    />
                </div>
            </div>
        </div>
    );
};

// StatCard Component
const StatCard = ({ icon, title, value, color }) => {
    return (
        <div className={`${color} text-white rounded-lg shadow-lg p-6`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm opacity-90">{title}</p>
                    <p className="text-3xl font-bold mt-2">{value}</p>
                </div>
                <div className="text-5xl opacity-80">{icon}</div>
            </div>
        </div>
    );
};

// QuickAction Component
const QuickAction = ({ icon, text, path }) => {
    return (
        <a
            href={path}
            className="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border-2 border-gray-200 hover:border-blue-500"
        >
            <span className="text-4xl mb-2">{icon}</span>
            <span className="text-sm font-medium text-center">{text}</span>
        </a>
    );
};

export default AdminDashboard;
