import { isNull } from '../../utils/validators/validateNull.js';
import validateGenreName from '../genres/validateName.js';

function validatemovie(movie = {}) {
    const errors = [];

    if (isNull(movie.genre)) {
        errors.push({ field: 'genre', message: 'Genre is required.' });
    } else if (!validateGenreName.validate(movie.genre.name)) {
        errors.push({ field: 'genre.name', message: validateGenreName.message });
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

export default validatemovie;