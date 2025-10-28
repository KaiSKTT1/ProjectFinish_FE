import Footer from "../components/common/Footer"
import Header from "../components/common/Header"
import MainPage from "../pages/user/MainPage"

const UserLayout = () => {
    return (
        <div>
            <Header />
            <MainPage />
            <Footer />
        </div>
    )
}

export default UserLayout;