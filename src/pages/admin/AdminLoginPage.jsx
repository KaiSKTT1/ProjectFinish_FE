import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { jwtDecode } from "jwt-decode";

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
        setError(""); // Clear error khi user nhập
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Call API login
            const response = await login(credentials);

            console.log("🔐 Admin Login Response:", response);

            // Lấy token từ response
            const token = response.token;

            if (!token) {
                throw new Error('Token không tồn tại trong response');
            }

            // Decode JWT để lấy thông tin
            const decoded = jwtDecode(token);
            console.log("📝 Decoded JWT:", decoded);
            console.log("👤 Scope:", decoded.scope);

            // Kiểm tra scope có chứa ROLE_ADMIN không
            const hasAdminRole = decoded.scope?.includes('ROLE_ADMIN');

            if (!hasAdminRole) {
                setError('Bạn không có quyền truy cập trang Admin!');
                return;
            }

            // Lưu token và scope
            localStorage.setItem('token', token);
            localStorage.setItem('userScope', decoded.scope);

            console.log("✅ Admin login success! Redirecting to /admin/dashboard");

            // Redirect về trang admin dashboard
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('❌ Admin login failed:', error);
            setError(error.response?.data?.message || 'Đăng nhập thất bại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Admin Badge */}
                <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-red-600 rounded-full mb-4">
                        <span className="text-5xl">🔐</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
                    <p className="text-gray-400">Đăng nhập để quản lý hệ thống</p>
                </div>

                {/* Login Form */}
                <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Tên đăng nhập
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="Nhập tên đăng nhập"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="Nhập mật khẩu"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${loading
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-red-600 hover:bg-red-700 hover:shadow-lg'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="animate-spin">⏳</span>
                                    Đang đăng nhập...
                                </span>
                            ) : (
                                'Đăng nhập'
                            )}
                        </button>
                    </form>

                    {/* Back to Home */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-gray-400 hover:text-white text-sm"
                        >
                            ← Quay về trang chủ
                        </button>
                    </div>
                </div>

                {/* Warning */}
                <div className="mt-6 text-center text-gray-500 text-sm">
                    ⚠️ Trang dành cho quản trị viên. Truy cập trái phép sẽ bị xử lý.
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
