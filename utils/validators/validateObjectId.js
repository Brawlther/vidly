import Joi from 'joi';
import joiObjectId from 'joi-objectid';

const objectId = joiObjectId(Joi);

function isValidObjectId(id) {
    const schema = objectId();
    const { error } = schema.validate(id);
    return !error;
}

export { isValidObjectId };