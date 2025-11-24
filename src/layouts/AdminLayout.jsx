import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminLayout = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        // Kiểm tra xem user có phải admin không
        const token = localStorage.getItem('token');
        const userScope = localStorage.getItem('userScope');

        console.log("🏛️ AdminLayout check:", { token: !!token, userScope });

        if (!token || !userScope?.includes('ROLE_ADMIN')) {
            console.log("❌ Not admin, redirect to /admin/login");
            navigate('/admin/login');
        } else {
            console.log("✅ Admin verified!");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userScope');
        navigate('/admin/login');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 flex flex-col`}>
                <div className="p-4 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        {isSidebarOpen && <h2 className="text-2xl font-bold">Admin Panel</h2>}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 rounded hover:bg-gray-700"
                        >
                            {isSidebarOpen ? '←' : '→'}
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2 flex-1">
                        <NavItem
                            icon="📊"
                            text="Dashboard"
                            path="/admin/dashboard"
                            isOpen={isSidebarOpen}
                            navigate={navigate}
                        />
                        <NavItem
                            icon="📚"
                            text="Khóa học"
                            path="/admin/courses"
                            isOpen={isSidebarOpen}
                            navigate={navigate}
                        />
                        <NavItem
                            icon="📁"
                            text="Danh mục"
                            path="/admin/categories"
                            isOpen={isSidebarOpen}
                            navigate={navigate}
                        />
                        <NavItem
                            icon="🛒"
                            text="Đơn hàng"
                            path="/admin/orders"
                            isOpen={isSidebarOpen}
                            navigate={navigate}
                        />
                        <NavItem
                            icon="👥"
                            text="Người dùng"
                            path="/admin/users"
                            isOpen={isSidebarOpen}
                            navigate={navigate}
                        />
                    </nav>

                    {/* Logout Button - Fixed at bottom */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            <span>🚪</span>
                            {isSidebarOpen && <span>Đăng xuất</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

// NavItem Component
const NavItem = ({ icon, text, path, isOpen, navigate }) => {
    return (
        <button
            onClick={() => navigate(path)}
            className="w-full px-4 py-3 rounded hover:bg-gray-700 flex items-center gap-3 transition-colors"
        >
            <span className="text-xl">{icon}</span>
            {isOpen && <span>{text}</span>}
        </button>
    );
};

export default AdminLayout;
