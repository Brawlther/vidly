import Joi from 'joi';

export const nameSchema = Joi
    .string()
    .min(5)
    .max(50)
    .required();