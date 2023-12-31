const express = require('express');
const router = express.Router();
const QuestionController = require('./question.controller');
const { auth, checkRole } = require('../../middleware/auth');

router.post('/create', auth, checkRole(2), QuestionController.createQuestionWithAnswers);
router.get('/all', auth, QuestionController.getAllQuestionsWithAnswers);
router.get('/:questionId', auth, QuestionController.getQuestionWithAnswers);
router.put('/:questionId', auth, checkRole(2), QuestionController.updateQuestionWithAnswers);
router.delete('/:questionId', auth, checkRole(2), QuestionController.deleteQuestionWithAnswers);
router.get('/subject/:subjectId', auth, QuestionController.getQuestionsBySubject);

module.exports = router;
