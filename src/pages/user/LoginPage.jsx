import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/common/LoginForm";
import { login } from "../../services/authService";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleUserLogin = async (credentials) => {
        try {
            // Call API login
            const response = await login(credentials);

            // Decode JWT để lấy role
            const decoded = jwtDecode(response.token);

            // Lưu token và scope (chứa roles)
            localStorage.setItem('token', response.token);
            localStorage.setItem('userScope', decoded.scope); // Lưu cả scope

            // Redirect về trang chủ user
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    return (
        <LoginForm
            title="Đăng nhập - User"
            onSubmit={handleUserLogin}
        />
    );
};

export default LoginPage;
