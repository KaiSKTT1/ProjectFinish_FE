import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCoursesByCategory } from "../../services/courseService";
import ItemCourse from "../../components/ui/ItemCourse";

const CoursesOfCategory = () => {
    // Lấy name và id từ URL: /courses/Backend/16739820-de20-4f45-a8fc-5d3da81a5f70
    const { name, id } = useParams();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoursesByCategory = async () => {
            try {
                setLoading(true);
                const data = await getCoursesByCategory(id, name);

                setCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses by category:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id && name) {
            fetchCoursesByCategory();
        }
    }, [id, name]);

    if (loading) {
        return (
            <div className="container mx-auto p-8 text-center">
                <p className="text-xl">Đang tải khóa học...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold mb-6">
                Khóa học: {name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length > 0 ? (
                    courses.map((course, index) => (
                        <ItemCourse
                            key={course.id || course.courseId || course.code || index}
                            course={course}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        <p className="text-xl">Chưa có khóa học nào trong danh mục này.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursesOfCategory;