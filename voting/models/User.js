const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    cno: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    avatar: {
        type: String,
    },
    userType: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    voteStatus: {
        type: String,
        default: false
    }
}, { timestamps: true });

module.exports = model('user', userSchema)