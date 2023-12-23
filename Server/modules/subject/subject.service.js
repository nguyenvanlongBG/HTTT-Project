const Subject = require('../../models/subject/subject.model');

exports.createSubject = async (subjectData) => {
  return Subject.create(subjectData);
};

exports.getSubjects = async () => {
  return Subject.find();
};

exports.getSubjectById = async (subjectId) => {
  return Subject.findById(subjectId);
};

exports.updateSubject = async (subjectId, subjectData) => {
  return Subject.findByIdAndUpdate(subjectId, subjectData, { new: true });
};

exports.deleteSubject = async (subjectId) => {
  return Subject.findByIdAndDelete(subjectId);
};
