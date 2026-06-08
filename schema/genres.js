import mongoose from 'mongoose';
import validateName from '../validators/genres/validateName.js';

const genreSchema = new mongoose.Schema({
    name: {
        type:String,
        trim: true,
        validate: {
            validator: function(v){
                return validateName.validate(v);
            },
            message: validateName.message
        }
    }
})

const Genre = mongoose.model('genres', genreSchema);

export { genreSchema };
export default Genre;