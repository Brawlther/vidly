import Course from '../entities/courses.js';
import connection from '../../db/connector.js';

async function updateCourse(id) {
    const course = await Course.findByIdAndUpdate({_id: id}, {
        $set: {
            author: 'Mosh Hamedani',
            isPublished: true,
        }
    }, { new: true })
    console.log(course)
}

export default updateCourse;