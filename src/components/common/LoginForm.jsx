import { useState } from "react";
import Button from "../ui/Button";

const LoginForm = ({ title, onSubmit, redirectAfterLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Call API login
            await onSubmit({ username, password });
            // Redirect được xử lý ở parent component
        } catch (err) {
            setError(err.message || "Đăng nhập thất bại");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {/* Tiêu đề động */}
                <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <Button title="Đăng nhập" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
