import { PHONE_REGEX } from './rules.js';

const message = 'Phone number should be in the format XXX-XXX-XXXX.';

function validate(phone) {
    if (!phone || !PHONE_REGEX.test(phone)) {
        return false;
    }
    return true;
}

export default {message, validate};