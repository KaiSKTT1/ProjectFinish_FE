import { H3, H4 } from "./Typography";
import Button from "./Button";

const ItemCourse = ({ course }) => {
    return (
        <div>
            <H3>
                <span>{course.category}</span>
                <span>{course.name}</span>
            </H3>
            <H4>{course.description}</H4>
            <H3>
                <span>1000</span>
            </H3>
            <Button>Mua khóa học</Button>
        </div >
    )
}

export default ItemCourse;