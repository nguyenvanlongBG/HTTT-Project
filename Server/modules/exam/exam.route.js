const express = require('express');
const router = express.Router();
const ExamController = require('./exam.controller');
const { auth, checkRole } = require('../../middleware/auth');

router.post('/create-exams/:examPeriodId', ExamController.createExamsForExamPeriod);
router.get('/all', auth, ExamController.getExams);
router.get('/:examId', ExamController.getExamWithQuestionsAndAnswers);
router.put('/:examId', auth, ExamController.updateExam);
router.delete('/:examId', auth, ExamController.deleteExam);

router.get('/period/:examPeriodId', auth, ExamController.getExamByPeriod);

module.exports = router;
