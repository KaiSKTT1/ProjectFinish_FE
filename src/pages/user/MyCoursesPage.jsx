import { useState, useEffect } from "react";
import { getMyCourses } from "../../services/orderService";
import ItemCourse from "../../components/ui/ItemCourse";
import { useNavigate } from "react-router-dom";

const MyCoursesPage = () => {
    const navigate = useNavigate();
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Vui lòng đăng nhập để xem khóa học của bạn!');
            navigate('/login');
            return;
        }

        fetchMyCourses();
    }, [navigate]);

    const fetchMyCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getMyCourses();
            console.log('My courses:', data);
            setMyCourses(data);
        } catch (error) {
            console.error('Failed to fetch my courses:', error);
            setError('Không thể tải khóa học của bạn. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto p-8 text-center">
                <div className="text-6xl mb-4">⏳</div>
                <p className="text-xl">Đang tải khóa học của bạn...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-8 text-center">
                <div className="text-6xl mb-4">❌</div>
                <p className="text-xl text-red-600 mb-4">{error}</p>
                <button
                    onClick={fetchMyCourses}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Khóa học của tôi</h1>

            {myCourses.length === 0 ? (
                // Empty state
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">📚</div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                        Bạn chưa có khóa học nào
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Hãy khám phá và mua khóa học để bắt đầu học tập!
                    </p>
                    <button
                        onClick={() => navigate('/courses')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                    >
                        Khám phá khóa học
                    </button>
                </div>
            ) : (
                // Courses list
                <div>
                    <div className="mb-4 flex justify-between items-center">
                        <p className="text-gray-600">
                            Bạn đã mua <span className="font-bold text-blue-600">{myCourses.length}</span> khóa học
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myCourses.map((course, index) => (
                            <div key={course.id || index} className="relative">
                                <ItemCourse course={course} />
                                {/* Badge "Đã mua" */}
                                <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    ✓ Đã mua
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCoursesPage;
