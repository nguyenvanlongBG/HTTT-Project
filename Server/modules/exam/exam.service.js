const Exam = require('../../models/exam/exam.model');
const ExamPeriod = require('../../models/examinationperiod/examperiod.model');
const Question = require('../../models/question/question.model');
const Answer = require('../../models/answer/answer.model');

// Hàm tạo đề thi cho mỗi học sinh dựa trên exam_format
const generateStudentExam = (questions, exam_format) => {
  const selectedQuestions = [];
  let remainingQuestions = [...questions];

  // Lấy số lượng câu hỏi từng loại và mức độ tương ứng
  const { level1, level2, level3, level4 } = exam_format;

  // Hàm lấy ngẫu nhiên câu hỏi từ danh sách và loại bỏ khỏi danh sách còn lại
  const getRandomQuestion = (questionList) => {
    if (questionList.length === 0) {
      return null; // Không còn câu hỏi
    }
    const randomIndex = Math.floor(Math.random() * questionList.length);
    const selectedQuestion = questionList.splice(randomIndex, 1)[0];
    return selectedQuestion;
  };

  // Lấy câu hỏi cho mức độ 1
  for (let i = 0; i < level1; i++) {
    const question = getRandomQuestion(remainingQuestions.filter((q) => q.level === 1));
    if (question) selectedQuestions.push(question._id);
  }

  // Lấy câu hỏi cho mức độ 2
  for (let i = 0; i < level2; i++) {
    const question = getRandomQuestion(remainingQuestions.filter((q) => q.level === 2));
    if (question) selectedQuestions.push(question._id);
  }

  // Lấy câu hỏi cho mức độ 3
  for (let i = 0; i < level3; i++) {
    const question = getRandomQuestion(remainingQuestions.filter((q) => q.level === 3));
    if (question) selectedQuestions.push(question._id);
  }

  // Lấy câu hỏi cho mức độ 4
  for (let i = 0; i < level4; i++) {
    const question = getRandomQuestion(remainingQuestions.filter((q) => q.level === 4));
    if (question) selectedQuestions.push(question._id);
  }

  return selectedQuestions;
};

exports.createExamsForExamPeriod = async (examPeriodId) => {
  try {
    const examPeriod = await ExamPeriod.findById(examPeriodId);
    if (!examPeriod) {
      throw new Error('Exam period not found');
    }

    const { subject_id, user_id, students, exam_format } = examPeriod;

    const questions = await Question.find({
      $or: [
        { created_by: user_id }, // Câu hỏi của giáo viên
        { is_public: true }, // Câu hỏi được set is_public true
      ],
      subject_id,
    });

    const exams = [];
    students.forEach((studentId) => {
      const studentExam = generateStudentExam(questions, exam_format);
      const examData = {
        exam_period_id: examPeriodId,
        user_id: studentId,
        type: 1,
        questions: studentExam,
      };
      exams.push(examData);
    });

    const createdExams = await Exam.insertMany(exams);

    return createdExams;
  } catch (error) {
    throw error;
  }
};


exports.getExamWithQuestionsAndAnswers = async (examId) => {
  try {
    // Lấy thông tin của đề thi
    const exam = await Exam.findById(examId);

    if (!exam) {
      // Nếu không tìm thấy đề thi, xử lý tại đây (trả về hoặc ném một lỗi)
      throw new Error('Exam not found');
    }

    // Lấy danh sách các câu hỏi của đề thi
    const questions = await Question.find({ _id: { $in: exam.questions } });

    // Lặp qua từng câu hỏi để lấy danh sách các câu trả lời của mỗi câu hỏi
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        // Lấy danh sách câu trả lời của câu hỏi
        const answers = await Answer.find({ question_id: question._id });

        // Trộn ngẫu nhiên câu trả lời
        const shuffledAnswers = shuffleArray(answers);

        // Trả về thông tin câu hỏi cùng với danh sách câu trả lời đã trộn
        return {
          question: question,
          answers: shuffledAnswers,
        };
      })
    );

    // Trộn ngẫu nhiên danh sách câu hỏi và câu trả lời
    const shuffledQuestionsWithAnswers = shuffleArray(questionsWithAnswers);

    // Trả về thông tin đề thi cùng với danh sách câu hỏi và câu trả lời đã trộn
    return {
      exam: exam,
      questionsWithAnswers: shuffledQuestionsWithAnswers,
    };
  } catch (error) {
    // Xử lý lỗi tại đây
    console.error('Error fetching exam with questions and answers:', error);
    throw error; // Throwing error để được xử lý ở layer cao nhất
  }
};

// Hàm trộn mảng ngẫu nhiên
function shuffleArray(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}


exports.getExams = async () => {
  return Exam.find();
};

exports.updateExam = async (examId, examData) => {
  return Exam.findByIdAndUpdate(examId, examData, { new: true });
};

exports.deleteExam = async (examId) => {
  return Exam.findByIdAndDelete(examId);
};
