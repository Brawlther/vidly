import validateName from './validateName.js';
import validatePhone from './validatePhone.js';
import { isNull } from '../../utils/validators/validateNull.js';

function validateCustomer(customer = {}) {
    const errors = [];

    if (isNull(customer.name)) {
        errors.push({ field: 'name', message: 'Name is required.' });
    } else if (!validateName.validate(customer.name)) {
        errors.push({ field: 'name', message: validateName.message });
    }

    if (isNull(customer.phone)) {
        errors.push({ field: 'phone', message: 'Phone is required.' });
    } else if (!validatePhone.validate(customer.phone)) {
        errors.push({ field: 'phone', message: validatePhone.message });
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

export default validateCustomer;