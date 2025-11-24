import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token');
    const userScope = localStorage.getItem('userScope');

    console.log("🔒 ProtectedRoute check:", { token: !!token, userScope, requiredRole });

    // Nếu chưa đăng nhập
    if (!token) {
        console.log("❌ No token, redirect to /login");
        return <Navigate to="/login" replace />;
    }

    // Nếu yêu cầu role cụ thể nhưng user không có role đó
    if (requiredRole && !userScope?.includes(requiredRole)) {
        console.log("❌ User doesn't have required role, redirect to /");
        return <Navigate to="/" replace />;
    }

    console.log("✅ Access granted!");
    return children;
};

export default ProtectedRoute;
