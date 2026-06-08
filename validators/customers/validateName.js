import { NAME_MIN_LENGTH } from './rules.js';

const message = `Name must be at least ${NAME_MIN_LENGTH} characters.`;

function validate(name) {
    if (!name || name.length < NAME_MIN_LENGTH) {
        return false;
    }
    return true;
}

export default {message, validate};