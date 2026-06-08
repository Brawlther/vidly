import Joi from 'joi';

export const passwordSchema = Joi
    .string()
    .min(5)
    .max(1024)
    .required();