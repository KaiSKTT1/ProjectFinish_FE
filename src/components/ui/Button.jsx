import { useState } from "react";

const Button = ({ title, icon, onClick, menu }) => {

    const [isClick, setIsClick] = useState(false);

    const handleClick = () => {
        // Nếu có menu thì toggle hiển thị menu
        if (menu) {
            setIsClick(!isClick);
        }
        // Nếu có onClick prop thì gọi nó
        if (onClick) {
            onClick();
        }
    };

    return (
        <>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleClick}
            >
                {title}
                {icon}
            </button>
            {isClick && menu}
        </>
    )
}

export default Button