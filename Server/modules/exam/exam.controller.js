const ExamService = require('./exam.service');

exports.createExamsForExamPeriod = async (req, res) => {
  try {
    const { examPeriodId } = req.params;
    const createdExams = await ExamService.createExamsForExamPeriod(examPeriodId);
    res.status(201).json(createdExams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExams = async (req, res) => {
  try {
    const exams = await ExamService.getExams();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExamWithQuestionsAndAnswers = async (req, res) => {
  try {
    const { examId } = req.params;
    const result = await ExamService.getExamWithQuestionsAndAnswers(examId);
    res.status(200).json({ success: true, content: result });
  } catch (error) {
    console.error('Error fetching exam with questions and answers:', error);
    res.status(500).json({ success: false, content: 'Internal Server Error' });
  }
};

exports.getExamByPeriod = async (req, res) => {
  try {
    const { examPeriodId } = req.params;
    const exams = await ExamService.getExamByPeriod(examPeriodId, req.user._id);
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exams by exam period and user:', error);
    res.status(500).json({ success: false, content: 'Internal Server Error' });
  }
};

exports.updateExam = async (req, res) => {
  const { examId } = req.params;
  const examData = req.body;
  try {
    const updatedExam = await ExamService.updateExam(examId, examData);
    if (!updatedExam) {
      res.status(404).json({ message: 'Exam not found' });
      return;
    }
    res.status(200).json(updatedExam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExam = async (req, res) => {
  const { examId } = req.params;
  try {
    const deletedExam = await ExamService.deleteExam(examId);
    if (!deletedExam) {
      res.status(404).json({ message: 'Exam not found' });
      return;
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
