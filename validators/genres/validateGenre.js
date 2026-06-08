import { isNull } from '../../utils/validators/validateNull.js';
import {nameSchema} from './validateName.js';
import Joi from 'joi';

function validateGenre(genre = {}) {
    const errors = [];

    const schema = Joi.object({
        name: nameSchema,
    });
    
    const { error, value } = schema.validate(genre);

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

export default validateGenre;