import { isNull } from '../../utils/validators/validateNull.js';

function validateRental(rental = {}) {
    const errors = [];

    if (isNull(rental.movie)) {
        errors.push({ field: 'movieId', message: 'Movie id is required.' });
    }

    if (isNull(rental.customer)) {
        errors.push({ field: 'customerId', message: 'Customer id is required.' });
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

export default validateRental;