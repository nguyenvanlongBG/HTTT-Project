const Classes = require("../../models/classes/classes.model");

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

exports.addStudentToClass = async (id, studentId) => {
    try {
        const updatedClasses = await Classes.findByIdAndUpdate(
            id,
            { $addToSet: { students: studentId } },
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
        if (!classData) {
            throw Error('class_not_found');
        }
        return classData.students;
    } catch (error) {
        throw error;
    }
}