import Joi from 'joi';

export const emailSchema = Joi
    .string()
    .min(5)
    .max(255)
    .required()
    .email();