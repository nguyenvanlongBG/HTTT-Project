const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  exam_period_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: { type: Number, required: true }, // Loại đề thi (1: chính thức, 2: thi thử)
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], // Mảng chứa ID của các câu hỏi
}, {
  timestamps: true,
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
