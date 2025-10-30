import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/common/LoginForm";
import { login } from "../../services/authService";
import { jwtDecode } from "jwt-decode";

const AdminLoginPage = () => {
    const navigate = useNavigate();

    const handleAdminLogin = async (credentials) => {
        try {
            // Call API login
            const response = await login(credentials);

            // Decode JWT để lấy thông tin
            const decoded = jwtDecode(response.token);

            // Kiểm tra scope có chứa ROLE_ADMIN không
            const hasAdminRole = decoded.scope?.includes('ROLE_ADMIN');

            if (!hasAdminRole) {
                throw new Error('Bạn không có quyền truy cập trang Admin');
            }

            // Lưu token
            localStorage.setItem('token', response.token);
            localStorage.setItem('userRole', 'ROLE_ADMIN');

            // Redirect về trang admin dashboard
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Admin login failed:', error);
            throw error;
        }
    };

    return (
        <LoginForm
            title="Đăng nhập - Admin"
            onSubmit={handleAdminLogin}
        />
    );
};

export default AdminLoginPage;
