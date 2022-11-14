const { Schema, model } = require('mongoose');
const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
    },
    vote: {
        type: Number,
        default: 0
    }
},
    { timestamps: true });

module.exports = model('Category', categorySchema)