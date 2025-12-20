import { useState, useEffect } from "react";
import { getMyInfo } from "../../services/userService";
import { getMyCourses } from "../../services/courseService";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            setLoading(true);

            // Gọi user info trước
            const userResponse = await getMyInfo();
            console.log("👤 User info:", userResponse);
            setUserInfo(userResponse);

            // Sau đó gọi courses (nếu fail thì vẫn có user info)
            try {
                const coursesResponse = await getMyCourses();
                console.log("📚 My courses:", coursesResponse);
                setMyCourses(Array.isArray(coursesResponse) ? coursesResponse : []);
            } catch (courseError) {
                console.error("❌ Failed to fetch courses:", courseError);
                console.error("❌ Course error details:", courseError.response?.data);
                // Nếu lỗi 400, có thể backend chưa sửa đúng
                if (courseError.response?.status === 400) {
                    console.warn("⚠️ Backend API /courses/my-course có vấn đề (400 Bad Request)");
                    console.warn("⚠️ Kiểm tra backend controller có còn @RequestBody không?");
                }
                setMyCourses([]); // Set empty array nếu lỗi
            }
        } catch (error) {
            console.error("❌ Failed to fetch profile data:", error);
            if (error.response?.status === 401) {
                alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <div className="text-4xl mb-4">⏳</div>
                <p className="text-xl text-gray-600">Đang tải thông tin...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Trang cá nhân</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: User Info */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                        {/* Avatar */}
                        <div className="flex justify-center mb-6">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                                {userInfo?.firstName?.charAt(0) || userInfo?.username?.charAt(0) || 'U'}
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="space-y-4">
                            <div className="text-center pb-4 border-b">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {userInfo?.firstName} {userInfo?.lastName}
                                </h2>
                                <p className="text-gray-500 text-sm mt-1">@{userInfo?.username}</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <span className="text-gray-500 text-sm font-medium w-24">Email:</span>
                                    <span className="text-gray-800 text-sm flex-1">{userInfo?.email || 'Chưa cập nhật'}</span>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-gray-500 text-sm font-medium w-24">Ngày sinh:</span>
                                    <span className="text-gray-800 text-sm flex-1">
                                        {userInfo?.dob ? new Date(userInfo.dob).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                                    </span>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-gray-500 text-sm font-medium w-24">Vai trò:</span>
                                    <div className="flex flex-wrap gap-2 flex-1">
                                        {userInfo?.roles && userInfo.roles.length > 0 ? (
                                            userInfo.roles.map((role, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
                                                    {role.name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">USER</span>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 text-sm font-medium">Khóa học:</span>
                                        <span className="text-2xl font-bold text-blue-600">{myCourses.length}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4 space-y-2">
                                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                    ✏️ Chỉnh sửa thông tin
                                </button>
                                <button
                                    onClick={() => navigate('/my-orders')}
                                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    📦 Đơn hàng của tôi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: My Courses */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span>📚</span>
                            <span>Khóa học đã mua ({myCourses.length})</span>
                        </h2>

                        {myCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {myCourses.map((course, idx) => (
                                    <div
                                        key={idx}
                                        className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                                        onClick={() => navigate(`/courses/${course.id}`)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0">
                                                📖
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                                                    {course.name || 'Khóa học'}
                                                </h3>
                                                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                                    {course.description || 'Không có mô tả'}
                                                </p>
                                                {course.category && (
                                                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                        {course.category.name}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <span className="text-6xl mb-4 block">📚</span>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    Chưa có khóa học nào
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Bạn chưa mua khóa học nào. Hãy khám phá và chọn khóa học phù hợp!
                                </p>
                                <button
                                    onClick={() => navigate('/courses')}
                                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                                >
                                    Xem khóa học
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
