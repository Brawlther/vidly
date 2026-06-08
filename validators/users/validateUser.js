import Joi from 'joi';
import {nameSchema} from './validateName.js';
import {emailSchema} from './validateEmail.js';
import {passwordSchema} from './validatePassword.js';

function validateUser(user = {}) {
    const errors = [];

    const schema = Joi.object({
        name: nameSchema,
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

export default validateUser;