import { H3, H4 } from "./Typography";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const ItemCourse = ({ course, onClick }) => {

    const navigate = useNavigate();

    const handleClickShowDetail = () => {
        console.log('Course clicked:', course); // Debug: xem course object

        // Lấy id từ các field có thể (id, courseId, code, _id)
        const courseId = course.id || course.courseId || course.code || course._id;
        console.log('Course ID:', courseId);   // Debug: xem id

        if (!courseId) {
            console.error('Course không có id!', course);
            alert('Lỗi: Course không có ID');
            return;
        }

        navigate(`/courses/${courseId}`);
    }

    return (
        <div onClick={handleClickShowDetail} className="cursor-pointer hover:shadow-lg hover:bg-gray-300 p-4">
            <H3>
                <span>{course.category?.name || course.category}</span>
                <hr />
                <span>{course.name}</span>
            </H3>
            <H4>{course.description}</H4>
            <H3>
                <span>{course.price || '1000'}</span>
            </H3>
            <Button>Mua khóa học</Button>
        </div >
    )
}

export default ItemCourse;