import mongoose from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
import config from 'config';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
})

userSchema.methods.generateAuthToken = function() {
    const token = jsonwebtoken.sign(
        {
            _id: this._id,
            isAdmin: this.isAdmin,
        },
        config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('users', userSchema);

export { userSchema };
export default User;