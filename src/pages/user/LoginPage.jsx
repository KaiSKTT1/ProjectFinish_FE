import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/common/LoginForm";
import { login } from "../../services/authService";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleUserLogin = async (credentials) => {
        try {
            // Call API login - response.data.result = {token, authenticated}
            const response = await login(credentials);

            // Lấy token từ response
            const token = response.token;

            if (!token) {
                throw new Error('Token không tồn tại trong response');
            }

            // Decode JWT để lấy role
            const decoded = jwtDecode(token);

            // Lưu token và scope (chứa roles)
            localStorage.setItem('token', token);
            localStorage.setItem('userScope', decoded.scope);

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
