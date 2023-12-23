const SubjectService = require('./subject.service');

exports.createSubject = async (req, res) => {
  try {
    const subject = await SubjectService.createSubject(req.body);
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await SubjectService.getSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubjectById = async (req, res) => {
  const { subjectId } = req.params;
  try {
    const subject = await SubjectService.getSubjectById(subjectId);
    if (!subject) {
      res.status(404).json({ message: 'Subject not found' });
      return;
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSubject = async (req, res) => {
  const { subjectId } = req.params;
  const subjectData = req.body;
  try {
    const updatedSubject = await SubjectService.updateSubject(subjectId, subjectData);
    if (!updatedSubject) {
      res.status(404).json({ message: 'Subject not found' });
      return;
    }
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSubject = async (req, res) => {
  const { subjectId } = req.params;
  try {
    const deletedSubject = await SubjectService.deleteSubject(subjectId);
    if (!deletedSubject) {
      res.status(404).json({ message: 'Subject not found' });
      return;
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
