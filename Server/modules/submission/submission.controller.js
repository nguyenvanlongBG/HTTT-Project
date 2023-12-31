const SubmissionService = require('./submission.service');

exports.createSubmission = async (req, res) => {
    try {
        const submission = await SubmissionService.createSubmission(req.body, req.user._id);
        res.status(201).json(submission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSubmissions = async (req, res) => {
    try {
        const submissions = await SubmissionService.getSubmissions();
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSubmissionById = async (req, res) => {
    const { submissionId } = req.params;
    try {
        const submission = await SubmissionService.getSubmissionById(submissionId);
        if (!submission) {
            res.status(404).json({ message: 'Submission not found' });
            return;
        }
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSubmission = async (req, res) => {
    const { submissionId } = req.params;
    const submissionData = req.body;
    try {
        const updatedSubmission = await SubmissionService.updateSubmission(submissionId, submissionData);
        if (!updatedSubmission) {
            res.status(404).json({ message: 'Submission not found' });
            return;
        }
        res.status(200).json(updatedSubmission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSubmission = async (req, res) => {
    const { submissionId } = req.params;
    try {
        const deletedSubmission = await SubmissionService.deleteSubmission(submissionId);
        if (!deletedSubmission) {
            res.status(404).json({ message: 'Submission not found' });
            return;
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSubmissionsByExamPeriodId = async (req, res) => {
    const { examPeriodId } = req.params;
    try {
        const submissions = await SubmissionService.getSubmissionsByExamPeriodId(examPeriodId);
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSubmissionsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const submissions = await SubmissionService.getSubmissionsByUserId(userId);
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSubmissionsByUserAndExamPeriod = async (req, res) => {
    const { userId, examPeriodId } = req.params;
    try {
        const submissions = await SubmissionService.getSubmissionsByUserAndExamPeriod(userId, examPeriodId);
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};