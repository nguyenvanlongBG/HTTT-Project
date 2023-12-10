const mongoose = require('mongoose');

const ClassesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    class_name: {
        type: String,
        required: true
    },
    class_code: {
        type: String,
        required: true,
        unique: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true,
});

module.exports = Classes= mongoose.model('Classes', ClassesSchema);
