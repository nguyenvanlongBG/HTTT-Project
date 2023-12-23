const Classes = require('../../models/classes/classes.model');
const ClassEnrollment = require('../../models/classenrollment/classenrollment.model');

exports.getClassIdByCode = async (classCode) => {
    try {
        const classData = await Classes.findOne({ class_code: classCode });

        if (!classData) {
            throw Error('class_not_found');
        }

        return classData._id;
    } catch (error) {
        throw error;
    }
};

exports.createEnrollmentRequest = async (classId, userId) => {
    try {
        const enrollment = await ClassEnrollment.create({
            class_id: classId,
            user_id: userId,
            status: 1,
        });

        return enrollment;
    } catch (error) {
        throw error;
    }
};

exports.getEnrollmentRequestsByClassId = async (classId) => {
    try {
        const pendingRequests = await ClassEnrollment.find({ class_id: classId, status: 1 });

        return pendingRequests;
    } catch (error) {
        throw error;
    }
};

exports.updateEnrollmentStatus = async (enrollmentId, status) => {
    try {
        const updatedEnrollment = await ClassEnrollment.findByIdAndUpdate(
            enrollmentId,
            { $set: { status: status } },
            { new: true }
        );

        if (!updatedEnrollment) {
            throw Error('enrollment_not_found');
        }

        if (status === 2) {
            const { class_id, user_id } = updatedEnrollment;

            await Classes.findByIdAndUpdate(
                class_id,
                { $addToSet: { students: user_id } },
                { new: true }
            );
        }

        return updatedEnrollment;
    } catch (error) {
        throw error;
    }
};