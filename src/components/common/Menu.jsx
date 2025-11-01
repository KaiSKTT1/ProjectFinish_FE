const Menu = ({ categories }) => {

    return (
        <div className="bg-white shadow-lg rounded-md p-2">
            {categories && categories.length > 0 ? (
                categories.map((category) => (
                    <div key={category.id} className="p-2 text-red-500 hover:bg-gray-200 cursor-pointer">
                        {category.name}
                    </div>
                ))
            ) : (
                <div className="p-2 text-gray-500">Không có danh mục</div>
            )}
        </div>
    )
}
export default Menu;