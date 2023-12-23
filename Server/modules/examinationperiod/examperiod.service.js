const ExamPeriod = require('../../models/examinationperiod/examperiod.model');

exports.createExamPeriod = async (examPeriodData) => {
  return ExamPeriod.create(examPeriodData);
};

exports.addStudentsToExamPeriod = async (examPeriodId, studentIds) => {
  try {
    const updatedExamPeriod = await ExamPeriod.findByIdAndUpdate(
      examPeriodId,
      { $addToSet: { students: { $each: studentIds } } },
      { new: true }
    );

    return updatedExamPeriod;
  } catch (error) {
    throw error;
  }
};

exports.getExamPeriods = async () => {
  return ExamPeriod.find();
};

exports.getExamPeriodById = async (examPeriodId) => {
  return ExamPeriod.findById(examPeriodId);
};

exports.getExamPeriodForStudent = async (examPeriodId) => {
  return ExamPeriod.findById(examPeriodId).select('-exam_format');
};

exports.updateExamPeriod = async (examPeriodId, examPeriodData) => {
  return ExamPeriod.findByIdAndUpdate(examPeriodId, examPeriodData, { new: true });
};

exports.deleteExamPeriod = async (examPeriodId) => {
  return ExamPeriod.findByIdAndDelete(examPeriodId);
};
