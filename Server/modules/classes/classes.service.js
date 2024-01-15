const Classes = require("../../models/classes/classes.model");
const User = require("../../models/user/user.model");
const ExamPeriod = require('../../models/examinationperiod/examperiod.model');
const Submission = require('../../models/submission/submission.model');
const Exam = require('../../models/exam/exam.model');

const generateUniqueClassCode = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let classCode = '';

    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        classCode += characters.charAt(randomIndex);
    }

    const existingClass = await Classes.findOne({ class_code: classCode });

    if (existingClass) {
        return generateUniqueClassCode();
    }

    return classCode;
};

exports.createClass = async (data) => {
    try {
        const uniqueClassCode = await generateUniqueClassCode();

        const newClass = await Classes.create({
            ...data,
            class_code: uniqueClassCode
        });

        return newClass;
    } catch (error) {
        throw error;
    }
};


exports.getClassById = async (id) => {
    try {
        let classData = await Classes.findById(id);
        if (!classData) {
            throw Error('class_not_found');
        }
        return classData;
    } catch (error) {
        throw error;
    }
}

exports.updateClass = async (id, newData) => {
    try {
        let updatedClass = await Classes.findByIdAndUpdate(id, { $set: newData }, { new: true });
        if (!updatedClass) {
            throw Error('class_not_found');
        }
        return updatedClass;
    } catch (error) {
        throw error;
    }
}

exports.deleteClass = async (id) => {
    try {
        let deletedClass = await Classes.findByIdAndDelete(id);
        if (!deletedClass) {
            throw Error('class_not_found');
        }
        return deletedClass;
    } catch (error) {
        throw error;
    }
}

exports.getAllClasses = async () => {
    try {
        let allClasses = await Classes.find().sort({ createdAt: 'desc' });
        return allClasses;
    } catch (error) {
        throw error;
    }
}

exports.getClassesByUserId = async (userId) => {
    try {
        const createdClasses = await Classes.find({ user_id: userId });

        const enrolledClasses = await Classes.find({ students: userId });

        const allClasses = [...createdClasses, ...enrolledClasses];

        return allClasses;
    } catch (error) {
        throw error;
    }
}

exports.addStudentToClass = async (id, emails) => {
    try {
        const students = await User.find({ email: { $in: emails } });
        const updatedClasses = await Classes.findByIdAndUpdate(
            id,
            { $addToSet: { students: { $each: students } } },
            { new: true }
        ).exec();
        if (!updatedClasses) {
            throw Error('class_not_found');
        }
        return updatedClasses;
    } catch (error) {
        throw error;
    }
}

exports.removeStudentFromClass = async (id, studentId) => {
    try {
        const updatedClasses = await Classes.findByIdAndUpdate(
            id,
            { $pull: { students: studentId } },
            { new: true }
        ).exec();
        if (!updatedClasses) {
            throw Error('class_not_found');
        }
        return updatedClasses;
    } catch (error) {
        throw error;
    }
}

exports.getStudentsInClass = async (classId) => {
    try {
        let classData = await Classes.findById(classId).populate('students');
        let periods = await ExamPeriod.find({ class_id: classId });

        if (!classData) {
            throw Error('class_not_found');
        }

        let students1 = [...classData.students];

        // Tạo đối tượng để lưu trữ thông tin điểm của học sinh
        let studentScores = {};

        // Tạo mảng để lưu trữ tên các kỳ thi
        let periodNames = periods.map(period => period.exam_period_name);

        for (const period of periods) {
            if (period.students && period.students.length > 0) {
                const commonStudents = students1.filter(student => period.students.includes(student._id.toString()));

                // Lưu thông tin điểm của học sinh nếu tham gia kỳ thi
                for (const student1 of commonStudents) {
                    const examId = await Exam.findOne({ exam_period_id: period._id, user_id: student1._id }).select('_id');
                    const submission = await Submission.findOne({ user_id: student1._id, exam_id: examId }).select('score');

                    // Lưu điểm vào đối tượng studentScores
                    if (!studentScores[student1._id.toString()]) {
                        studentScores[student1._id.toString()] = { name: student1.name, scores: {} };
                    }

                    studentScores[student1._id.toString()].scores[period.exam_period_name] = submission ? submission.score : null;
                }
            }
        }

        // Kiểm tra và thêm học sinh không tham gia vào kết quả
        for (const student1 of students1) {
            const studentIdString = student1._id.toString();
            if (!studentScores[studentIdString]) {
                studentScores[studentIdString] = { name: student1.name, scores: {} };
                for (const period of periods) {
                    studentScores[studentIdString].scores[period.exam_period_name] = null;
                }
            }
        }

        return { studentScores, periods: periodNames };
    } catch (error) {
        throw error;
    }
}
