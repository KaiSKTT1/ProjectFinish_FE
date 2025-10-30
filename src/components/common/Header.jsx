import Button from "../ui/Button"
import { ICONS } from "../../utils/ICONS"
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate();
    const YoutubeIcon = ICONS.youtube;
    const FacebookIcon = ICONS.facebook;

    const handleLoginClick = () => {
        navigate('/login'); // Chuyển sang trang login
    };

    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
            {/* Left section - Logo + Navigation */}
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold">My Application</h1>
                <nav className="flex items-center gap-2">
                    <Button title="Khóa học" />
                    <Button title="Review" />
                    <Button title="Tư vấn" />
                    <Button title="Donate" />
                </nav>
            </div>

            {/* Right section - Social + Actions */}
            <div className="flex items-center gap-2">
                <Button icon={<YoutubeIcon />} />
                <Button icon={<FacebookIcon />} />
                <Button title="Login" onClick={handleLoginClick} />
            </div>
        </header>
    )
}
export default Header