import Joi from 'joi';
import {emailSchema} from '../users/validateEmail.js';
import {passwordSchema} from '../users/validatePassword.js';

function validateAuth(user = {}) {
    const errors = [];

    const schema = Joi.object({
        email: emailSchema,
        password: passwordSchema,
    });
    
    const { error, value } = schema.validate(user);

    if (error) {
        error.details.forEach((detail) => {
            errors.push(detail.message);
        });
    }
    
    return {
        valid: errors.length === 0,
        errors
    };
}

export default validateAuth;