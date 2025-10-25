import Footer from "../components/common/Footer"
import Header from "../components/common/Header"
import { H1, Body, Caption } from "../components/ui/Typography"

const UserLayout = () => {
    return (
        <div>
            <Header />
            <main className="p-4">
                <H1>Chào mừng đến ứng dụng</H1>
                <Body>Đây là nội dung chính của trang</Body>
                <Caption>© 2025 - Bản quyền được bảo vệ</Caption>
            </main>
            <Footer />
        </div>
    )
}

export default UserLayout;