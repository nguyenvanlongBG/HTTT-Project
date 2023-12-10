const ClassEnrollService = require('./classenrollment.service');

exports.createEnrollmentRequest = async (req, res) => {
    try {
        const { classId, userId } = req.body;
        const enrollment = await ClassEnrollService.createEnrollmentRequest(classId, userId);
        res.json(enrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEnrollmentRequestsByClassId = async (req, res) => {
    try {
        const { classId } = req.params;
        const pendingRequests = await ClassEnrollService.getEnrollmentRequestsByClassId(classId);
        res.json(pendingRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEnrollmentStatus = async (req, res) => {
    try {
        const { enrollmentId, status } = req.body;
        const updatedEnrollment = await ClassEnrollService.updateEnrollmentStatus(enrollmentId, status);
        res.json(updatedEnrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};