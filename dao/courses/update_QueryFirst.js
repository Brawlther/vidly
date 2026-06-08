import Course from '../entities/courses.js';
import connection from '../../db/connector.js';

async function updateCourse(id) {
    //find By Id
    const course = await Course.findById(id)
    if (!course) {
        console.log(`Course with id ${id} not found.`);
        return
    };
    //modify its properties
    course.isPublished = true
    course.author = 'Updated Author Name'
    //save()
    return await course.save()
}

export default updateCourse;