const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question_type: { type: Number, required: true }, // Loại câu hỏi (1: trắc nghiệm 1 đáp án, 2: trắc nghiệm nhiều đáp án, có thể mở rộng)
  description: { type: String, required: true },
  subject_id: { type: mongoose.Schema.Types.ObjectId, required: true , ref: 'Subject'},
  level: { type: Number, required: true }, // Mức độ câu hỏi
  created_by: { type: mongoose.Schema.Types.ObjectId, required: true , ref: 'User'},
  is_public: { type: Boolean, required: true },
}, {
  timestamps: true,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
