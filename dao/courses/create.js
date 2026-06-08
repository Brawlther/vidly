import Course from '../../schema/courses.js';
import connection from '../../db/connector.js';

async function createCourse(newCourse) {
    const course = new Course(newCourse);
    const result = await course.save()
    return result;
}

export default createCourse;