import Course from '../entities/courses.js';
import connection from '../../db/connector.js';

async function removeCourse(id) {
    const course = await Course.findByIdAndDelete({_id: id})
    return course
}

export default removeCourse;