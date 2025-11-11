import { useState, useEffect } from "react";
import { getCourses } from "../../services/courseService";
import ItemCourse from "../../components/ui/ItemCourse";

const CoursesPage = () => {
    // States
    const [listCourses, setListCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data khi component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const data = await getCourses();
                setListCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="container mx-auto p-8 text-center">
                <p className="text-xl">Đang tải khóa học...</p>
            </div>
        );
    }

    // Render UI
    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold mb-6">Tất cả khóa học</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {listCourses.length > 0 ? (
                    listCourses.map((course, index) => (
                        <ItemCourse
                            key={course.id || course.courseId || course.code || index}
                            course={course}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        <p className="text-xl">Không có khóa học nào.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CoursesPage;