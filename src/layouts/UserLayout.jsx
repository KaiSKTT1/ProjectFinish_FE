import Footer from "../components/common/Footer"
import Header from "../components/common/Header"
import { Outlet } from "react-router-dom"

const UserLayout = () => {
    return (
        <div>
            <Header />
            {/* Outlet sẽ render Page tương ứng với route */}
            <Outlet />
            <Footer />
        </div>
    )
}

export default UserLayout;