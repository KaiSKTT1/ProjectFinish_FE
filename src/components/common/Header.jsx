import Button from "../ui/Button"
import { ICONS } from "../../utils/ICONS"
import { useNavigate } from "react-router-dom"
import Menu from "./Menu"
import { getCategories } from "../../services/categoryService"
import { useEffect, useState } from "react"

const Header = () => {
    const navigate = useNavigate();
    const YoutubeIcon = ICONS.youtube;
    const FacebookIcon = ICONS.facebook;
    const token = localStorage.getItem('token');
    const [categories, setCategories] = useState([]);

    const handleLoginClick = () => {
        navigate('/login'); // Chuyển sang trang login
    };

    const handleCartClick = () => {
        navigate('/cart'); // Chuyển sang trang giỏ hàng
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userScope');
        navigate('/'); // Chuyển về trang chủ
    }

    const handleLogoClick = () => {
        navigate('/'); // Chuyển về trang chủ
    }

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            console.log('Categories data:', data); // Debug
            // Kiểm tra nếu data là object có property result (như CourseResponse)
            if (data.result && Array.isArray(data.result)) {
                console.log('Categories result:', data.result); // Debug từng category
                setCategories(data.result);
            } else if (Array.isArray(data)) {
                console.log('Categories array:', data); // Debug từng category
                setCategories(data);
            } else {
                console.error('Categories is not an array:', data);
                setCategories([]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);



    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
            {/* Left section - Logo + Navigation */}
            <div className="flex items-center gap-4">
                <h1
                    className="text-xl font-bold cursor-pointer hover:text-blue-400 transition-colors"
                    onClick={handleLogoClick}
                >
                    My Application
                </h1>
                <nav className="flex items-center gap-2">
                    <Button
                        title="Khóa học"
                        menu={<Menu categories={categories} />} />
                    <Button title="Review" />
                    <Button title="Tư vấn" />
                    <Button title="Donate" />
                </nav>
            </div>

            {/* Right section - Social + Actions */}
            <div className="flex items-center gap-2">
                <Button icon={<YoutubeIcon />} />
                <Button icon={<FacebookIcon />} />

                {token ? (
                    <>
                        <Button title="Giỏ hàng" onClick={handleCartClick} />
                        <Button title="Logout" onClick={handleLogoutClick} />
                    </>
                ) : (
                    <Button title="Login" onClick={handleLoginClick} />
                )}
            </div>
        </header>
    )
}
export default Header