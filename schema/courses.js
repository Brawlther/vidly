import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    // _id: String,
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        //match: /pattern/
    },
    category:{
        type: String,
        enum:['web', 'mobile', 'network'],
        required: true,
        lowercase: true,
    },
    author: String,
    tags: {
        type: Array,
        validate:{
            validator: async function(v){
                await new Promise(resolve => setTimeout(resolve, 4000));
                return v && v.length > 0;
            },
            message: 'A course should have at least one tag.',
        }
    },
    date: {type:Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){ return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v),
    },
})

const Course = mongoose.model('courses', courseSchema);

export default Course;