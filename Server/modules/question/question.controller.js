const QuestionService = require('./question.service');

exports.createQuestionWithAnswers = async (req, res) => {
  try {
    const { questionData, answersData } = req.body;
    const result = await QuestionService.createQuestionWithAnswers(questionData, answersData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllQuestionsWithAnswers = async (req, res) => {
  const { role, userId } = req.user;

  try {
    const questionsWithAnswers = await QuestionService.getAllQuestionsWithAnswers(role, userId);
    res.status(200).json(questionsWithAnswers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestionWithAnswers = async (req, res) => {
  const { questionId } = req.params;
  const userRole = req.user ? req.user.role : null;

  try {
    const result = await QuestionService.getQuestionWithAnswers(questionId, userRole);
    if (!result) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuestionWithAnswers = async (req, res) => {
  const { questionId } = req.params;
  const { questionData, answersData } = req.body;

  try {
    const result = await QuestionService.updateQuestionWithAnswers(questionId, questionData, answersData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuestionWithAnswers = async (req, res) => {
  const { questionId } = req.params;

  try {
    await QuestionService.deleteQuestionWithAnswers(questionId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
