const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {//1. Học sinh, 2: Giáo viên
        type: Number,
        enum: [1, 2],
        default: 1 
    },
    avatar: {
        type: String
    },
},{
    timestamps: true,
});

module.exports = User = mongoose.model('User', UserSchema);