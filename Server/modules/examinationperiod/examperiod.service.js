const ExamPeriod = require('../../models/examinationperiod/examperiod.model');
const User = require('../../models/user/user.model');
const Classes = require('../../models/classes/classes.model');

exports.createExamPeriod = async (examPeriodData, userId) => {
  examPeriodData.user_id = userId;
  try {
    const classInfo = await Classes.findById(examPeriodData.class_id);
    if (!classInfo) {
      throw new Error('Class not found');
    }
    examPeriodData.subject_id = classInfo.subject_id;
    // Kiểm tra xem lớp có sinh viên hay không
    if (classInfo.students && classInfo.students.length > 0) {
      // Thêm sinh viên từ lớp vào kỳ thi
      examPeriodData.students = classInfo.students;
    }

    // Tạo kỳ thi
    const createdExamPeriod = await ExamPeriod.create(examPeriodData);

    return createdExamPeriod;
  } catch (error) {
    throw error;
  }
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

exports.getExamPeriodsForClass = async (classId) => {
  try {
    return ExamPeriod.find({ class_id: classId });
  } catch (error) {
    throw error;
  }
};

exports.addStudentsFromClassToExamPeriod = async (examPeriodId, classId) => {
  try {
      // Lấy danh sách sinh viên của lớp
      const classInfo = await Classes.findById(classId);
      if (!classInfo) {
          throw new Error('Class not found');
      }

      const classStudents = classInfo.students || [];

      // Lấy danh sách sinh viên của kỳ thi
      const examPeriod = await ExamPeriod.findById(examPeriodId);
      if (!examPeriod) {
          throw new Error('Exam period not found');
      }

      const examStudents = examPeriod.students || [];

      // Lọc ra các sinh viên chưa tồn tại trong danh sách của kỳ thi
      const newStudents = classStudents.filter(studentId => !examStudents.includes(studentId));

      // Thêm sinh viên mới vào kỳ thi
      const updatedExamPeriod = await ExamPeriod.findByIdAndUpdate(
          examPeriodId,
          { $addToSet: { students: { $each: newStudents } } },
          { new: true }
      );

      return updatedExamPeriod;
  } catch (error) {
      throw error;
  }
};