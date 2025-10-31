import { useState, useEffect } from "react";
import ItemCourse from "../../components/ui/ItemCourse";
import Button from "../../components/ui/Button";
import { getCourses } from "../../services/courseService";

const MainPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const data = await getCourses();
                setCourses(data);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

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
                <Button title=">>Xem tất cả khóa học<<" />
            </div>
        </>
    )
}
export default MainPage;