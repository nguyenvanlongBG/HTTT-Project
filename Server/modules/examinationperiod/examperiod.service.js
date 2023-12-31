const ExamPeriod = require('../../models/examinationperiod/examperiod.model');
const User = require("../../models/user/user.model");

exports.createExamPeriod = async (examPeriodData, userId) => {
  examPeriodData.user_id = userId;
  return ExamPeriod.create(examPeriodData);
};

exports.addStudentsToExamPeriod = async (examPeriodId, studentIds) => {
  try {
    const students = await User.find({ _id: { $in: studentIds } });
    const updatedExamPeriod = await ExamPeriod.findByIdAndUpdate(
      examPeriodId,
      { $addToSet: { students: { $each: students } } },
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
  return ExamPeriod.findById(examPeriodId);
};

exports.updateExamPeriod = async (examPeriodId, examPeriodData) => {
  return ExamPeriod.findByIdAndUpdate(examPeriodId, examPeriodData, { new: true });
};

exports.deleteExamPeriod = async (examPeriodId) => {
  return ExamPeriod.findByIdAndDelete(examPeriodId);
};
