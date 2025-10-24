const Button = ({ title, icon }) => {

    return (
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            {title}
            {icon}
        </button>
    )
}

export default Button