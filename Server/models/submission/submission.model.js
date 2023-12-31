const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  exam_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  submit_time: { type: Date, required: true },
  result: { type: String, required: true },
  student_answers: [
    {
      question_id: mongoose.Schema.Types.ObjectId,
      selected_answers: [mongoose.Schema.Types.ObjectId],
    },
  ],
  score: {
    type: Number,
    min: 0,
    max: 10
  },
}, {
  timestamps: true,
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
