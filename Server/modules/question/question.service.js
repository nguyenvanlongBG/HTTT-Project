const Question = require('../../models/question/question.model');
const Answer = require('../../models/answer/answer.model');

exports.createQuestionWithAnswers = async (questionData, answersData, userId) => {
  questionData.created_by = userId
  const createdQuestion = await Question.create(questionData);

  const answers = answersData.map(answer => ({
    question_id: createdQuestion._id,
    ...answer,
  }));

  const createdAnswers = await Answer.insertMany(answers);

  return { question: createdQuestion, answers: createdAnswers };
};

exports.getAllQuestionsWithAnswers = async (userRole, userId) => {
  let questionsWithAnswers;

  if (userRole === 2) {
    // Giáo viên
    questionsWithAnswers = await Question.find({
      $or: [
        { created_by: userId }, // Câu hỏi của giáo viên
        { is_public: true } // Câu hỏi được set is_public true
      ]
    });

    // Lấy câu trả lời cho mỗi câu hỏi
    for (const question of questionsWithAnswers) {
      const answers = await Answer.find({ question_id: question._id });
      question.answers = answers;
    }
  } else {
    // Học sinh
    questionsWithAnswers = await Question.find({ is_public: true });

    // Lấy câu trả lời cho mỗi câu hỏi
    for (const question of questionsWithAnswers) {
      const answers = await Answer.find({ question_id: question._id });
      question.answers = answers;
    }
  }

  return questionsWithAnswers;
};

exports.getQuestionsBySubject = async (userRole, userId, subjectId) => {
  let questionsWithAnswers;

  if (userRole === 2) {
    // Giáo viên
    questionsWithAnswers = await Question.find({
      $or: [
        { created_by: userId, subject_id: subjectId }, // Câu hỏi của giáo viên
        { is_public: true, subject_id: subjectId } // Câu hỏi được set is_public true
      ]
    });

    // Lấy câu trả lời cho mỗi câu hỏi
    for (const question of questionsWithAnswers) {
      const answers = await Answer.find({ question_id: question._id });
      question.answers = answers;
    }
  } else {
    // Học sinh
    questionsWithAnswers = await Question.find({ is_public: true, subject_id: subjectId });

    // Lấy câu trả lời cho mỗi câu hỏi
    for (const question of questionsWithAnswers) {
      const answers = await Answer.find({ question_id: question._id });
      question.answers = answers;
    }
  }

  return questionsWithAnswers;
};

exports.getQuestionWithAnswers = async (questionId, userRole) => {
  const question = await Question.findById(questionId);

  if (!question) {
    return null;
  }

  let answers;

  if (userRole === 2) {
    // Giáo viên
    answers = await Answer.find({ question_id: questionId });
  } else {
    // Học sinh
    answers = await Answer.find({ question_id: questionId }, { is_correct: 0 });
  }

  return { question, answers };
};

exports.updateQuestionWithAnswers = async (questionId, questionData, answersData) => {
  const updatedQuestion = await Question.findByIdAndUpdate(questionId, questionData, { new: true });

  await Answer.deleteMany({ question_id: questionId });

  const answers = answersData.map(answer => ({
    question_id: questionId,
    ...answer,
  }));

  const updatedAnswers = await Answer.insertMany(answers);

  return { question: updatedQuestion, answers: updatedAnswers };
};

exports.deleteQuestionWithAnswers = async (questionId) => {
  await Question.findByIdAndDelete(questionId);
  await Answer.deleteMany({ question_id: questionId });
};
