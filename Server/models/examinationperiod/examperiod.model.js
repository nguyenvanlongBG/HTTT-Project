const mongoose = require('mongoose');

const examPeriodSchema = new mongoose.Schema({
    exam_period_name: { type: String, required: true },
    subject_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    startTime: { type: Date, required: true },
    finishTime: { type: Date, required: true },
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classes',
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    exam_format: {
        level1: { type: Number, default: 0 },
        level2: { type: Number, default: 0 },
        level3: { type: Number, default: 0 },
        level4: { type: Number, default: 0 }
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true,
});

const ExamPeriod = mongoose.model('ExamPeriod', examPeriodSchema);

module.exports = ExamPeriod;
