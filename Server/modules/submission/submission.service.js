const Submission = require('../../models/submission/submission.model');
const Exam = require('../../models/exam/exam.model')
const Question = require('../../models/question/question.model')
const Answer = require('../../models/answer/answer.model')

const countCorrectAnswers = async (studentAnswers) => {
    const correctAnswers = await Promise.all(
        studentAnswers.map(async (answer) => {
            const { question_id: questionId, selected_answers: selectedAnswers } = answer;
            const questionType = await getQuestionType(questionId);

            if (await isStudentAnswerCorrect(questionType, selectedAnswers)) {
                return 1;
            } else {
                return 0;
            }
        })
    );

    return correctAnswers.reduce((acc, result) => acc + result, 0);
};

const isStudentAnswerCorrect = async (questionType, selectedAnswers) => {
    const detailedAnswers = await Promise.all(
        selectedAnswers.map(async (selectedAnswerId) => {
            const answer = await Answer.findById(selectedAnswerId);
            return answer;
        })
    );

    if (questionType === 1) {
        return detailedAnswers.length === 1 && detailedAnswers[0].is_correct;
    } else if (questionType === 2) {
        return detailedAnswers.every(answer => answer.is_correct);
    }

    return false;
};

const getQuestionType = async (questionId) => {
    const question = await Question.findById(questionId);
    return question.question_type;
};

exports.createSubmission = async (submissionData, userId) => {
    submissionData.user_id = userId;
    submissionData.submit_time = new Date();

    const totalQuestions = submissionData.student_answers.length;
    const correctAnswers = await countCorrectAnswers(submissionData.student_answers);

    const result = `${correctAnswers}/${totalQuestions}`;
    submissionData.result = result;

    // Tính điểm theo công thức: (số câu đúng / tổng số câu) * 10
    const score = (correctAnswers / totalQuestions) * 10;
    submissionData.score = score;

    return Submission.create(submissionData);
};

exports.getSubmissions = async () => {
    return Submission.find();
};

exports.getSubmissionById = async (submissionId) => {
    return Submission.findById(submissionId);
};

exports.updateSubmission = async (submissionId, submissionData) => {
    return Submission.findByIdAndUpdate(submissionId, submissionData, { new: true });
};

exports.deleteSubmission = async (submissionId) => {
    return Submission.findByIdAndDelete(submissionId);
};

exports.getSubmissionsByExamPeriodId = async (examPeriodId) => {
    const examIds = await Exam.find({ exam_period_id: examPeriodId }).distinct('_id');
    return Submission.find({ exam_id: { $in: examIds } });
};

exports.getSubmissionsByUserId = async (userId) => {
    return Submission.find({ user_id: userId });
};

exports.getSubmissionsByUserAndExamPeriod = async (userId, examPeriodId) => {
    const examIds = await Exam.find({ exam_period_id: examPeriodId }).distinct('_id');
    return Submission.find({ user_id: userId, exam_id: { $in: examIds } });
};