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
    const questions = await Question.find({
      $or: [
        { created_by: userId}, // Câu hỏi của giáo viên
        { is_public: true} // Câu hỏi được set is_public true
      ]
    });

    questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        // Lấy danh sách câu trả lời của câu hỏi
        const answers = await Answer.find({ question_id: question._id });
        return {
          question: question,
          answers: answers,
        };
      })
    );
  } else {
    // Học sinh
    const questions = await Question.find({ is_public: true});

    questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        // Lấy danh sách câu trả lời của câu hỏi
        const answers = await Answer.find({ question_id: question._id });
        return {
          question: question,
          answers: answers,
        };
      })
    );
  }

  return questionsWithAnswers;
};

exports.getQuestionsBySubject = async (userRole, userId, subjectId) => {
  let questionsWithAnswers;

  if (userRole === 2) {
    // Giáo viên
    const questions = await Question.find({
      $or: [
        { created_by: userId, subject_id: subjectId }, // Câu hỏi của giáo viên
        { is_public: true, subject_id: subjectId } // Câu hỏi được set is_public true
      ]
    });

    questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        // Lấy danh sách câu trả lời của câu hỏi
        const answers = await Answer.find({ question_id: question._id });
        return {
          question: question,
          answers: answers,
        };
      })
    );
  } else {
    // Học sinh
    const questions = await Question.find({ is_public: true, subject_id: subjectId });

    questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        // Lấy danh sách câu trả lời của câu hỏi
        const answers = await Answer.find({ question_id: question._id });
        return {
          question: question,
          answers: answers,
        };
      })
    );
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
