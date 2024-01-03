const ExamPeriodService = require('./examperiod.service');

exports.createExamPeriod = async (req, res) => {
  try {
    const examPeriod = await ExamPeriodService.createExamPeriod(req.body, req.user._id);
    res.status(201).json(examPeriod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.addStudentsToExamPeriod = async (req, res) => {
  try {
    const { examPeriodId}  = req.params;
    const { studentIds } = req.body;

    const updatedExamPeriod = await ExamPeriodService.addStudentsToExamPeriod(examPeriodId, studentIds);

    res.status(200).json(updatedExamPeriod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExamPeriods = async (req, res) => {
  try {
    const examPeriods = await ExamPeriodService.getExamPeriods();
    res.status(200).json(examPeriods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExamPeriodById = async (req, res) => {
  const { examPeriodId } = req.params;
  try {
    const examPeriod = await ExamPeriodService.getExamPeriodById(examPeriodId);
    if (!examPeriod) {
      res.status(404).json({ message: 'Exam period not found' });
      return;
    }
    res.status(200).json(examPeriod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExamPeriodForStudent = async (req, res) => {
  const { examPeriodId } = req.params;
  try {
    const examPeriod = await ExamPeriodService.getExamPeriodForStudent(examPeriodId);
    if (!examPeriod) {
      res.status(404).json({ message: 'Exam period not found' });
      return;
    }
    res.status(200).json(examPeriod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExamPeriod = async (req, res) => {
  const { examPeriodId } = req.params;
  const examPeriodData = req.body;
  try {
    const updatedExamPeriod = await ExamPeriodService.updateExamPeriod(examPeriodId, examPeriodData);
    if (!updatedExamPeriod) {
      res.status(404).json({ message: 'Exam period not found' });
      return;
    }
    res.status(200).json(updatedExamPeriod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExamPeriod = async (req, res) => {
  const { examPeriodId } = req.params;
  try {
    const deletedExamPeriod = await ExamPeriodService.deleteExamPeriod(examPeriodId);
    if (!deletedExamPeriod) {
      res.status(404).json({ message: 'Exam period not found' });
      return;
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExamPeriodsForClass = async (req, res) => {
  const { classId } = req.params;
  
  try {
      const examPeriods = await ExamPeriodService.getExamPeriodsForClass(classId);
      res.status(200).json(examPeriods);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.addStudentsFromClassToExamPeriod = async (req, res) => {
  try {
      const { examPeriodId } = req.params;
      const { class_id } = req.body;

      const updatedExamPeriod = await ExamPeriodService.addStudentsFromClassToExamPeriod(examPeriodId, class_id);
      res.status(200).json(updatedExamPeriod);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};