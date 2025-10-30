import Footer from "../components/common/Footer"
import Header from "../components/common/Header"
import LoginPage from "../pages/user/LoginPage"
import AdminLoginPage from "../pages/admin/AdminLoginPage"

const AuthLayout = ({ isAdmin = false }) => {
    return (
        <div>
            <Header />
            {/* Render LoginPage khác nhau dựa vào props */}
            {isAdmin ? <AdminLoginPage /> : <LoginPage />}
            <Footer />
        </div>
    )
}

export default AuthLayout;