import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemCourse from "../../components/ui/ItemCourse";
import Button from "../../components/ui/Button";
import { getCourses } from "../../services/courseService";

const MainPage = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const data = await getCourses();

                console.log("🏠 MainPage API Response:", data);
                console.log("🏠 Is Array?", Array.isArray(data));
                console.log("🏠 Has content?", data?.content);
                console.log("🏠 Data type:", typeof data);

                // Xử lý cả 2 trường hợp: array trực tiếp hoặc object có content
                if (Array.isArray(data)) {
                    setCourses(data);
                } else if (data?.content && Array.isArray(data.content)) {
                    setCourses(data.content);
                } else {
                    console.warn("⚠️ Unexpected data structure:", data);
                    setCourses([]);
                }
            } catch (error) {
                console.error('Failed to fetch courses:', error);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleShowAllCourse = () => {
        navigate('/courses');
    }

    if (loading) {
        return <div className="text-center p-4">Đang tải...</div>;
    }

    return (
        <>
            <div className="flex justify-around p-4">
                {courses.length > 0 ? (
                    courses.slice(0, 3).map((course, index) => (
                        <ItemCourse
                            key={course.id || course.courseId || course.code || index}
                            course={course}
                        />
                    ))
                ) : "Không có giá trị"}
            </div>

            <div className="flex justify-center mt-4">
                <Button onClick={handleShowAllCourse} title=">>Xem tất cả khóa học<<" />
            </div>
        </>
    )
}
export default MainPage;