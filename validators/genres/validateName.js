import Joi from 'joi';

export const nameSchema = Joi
    .string()
    .min(5)
    .max(50)
    .required();

const message = `Name needs to be at least 5 characters long and at most 50 characters long.`;

function validate(name) {
    return nameSchema.validate(name);
}

export default {message, validate, nameSchema};