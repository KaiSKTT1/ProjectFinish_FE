import { useNavigate } from "react-router-dom"

const Menu = ({ categories }) => {
    const navigate = useNavigate();

    const handleClickCategory = (category) => {

        navigate(`/courses/${category.name}/${category.id}`);
    };

    return (
        <div className="bg-white shadow-lg rounded-md p-2">
            {categories && categories.length > 0 ? (
                categories.map((category, index) => {
                    // Lấy unique key từ các field có thể
                    const key = category.id;

                    return (
                        <div
                            key={key}
                            className="p-2 text-red-500 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleClickCategory(category)}
                        >
                            {category.name}
                        </div>
                    );
                })
            ) : (
                <div className="p-2 text-gray-500">Không có danh mục</div>
            )}
        </div>
    );
};

export default Menu;