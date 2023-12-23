const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  question_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  description: { type: String, required: true },
  is_correct: { type: Boolean, required: true },
}, {
  timestamps: true,
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
