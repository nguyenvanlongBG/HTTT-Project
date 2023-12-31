const express = require('express');
const router = express.Router();
const SubmissionController = require('./submission.controller');
const { auth, checkRole } = require('../../middleware/auth');

router.post('/create', auth, SubmissionController.createSubmission);
router.get('/all', auth, SubmissionController.getSubmissions);
router.get('/:submissionId', auth, SubmissionController.getSubmissionById);
router.put('/:submissionId', auth, SubmissionController.updateSubmission);
router.delete('/:submissionId', auth, SubmissionController.deleteSubmission);
router.get('/exam-period/:examPeriodId', auth, checkRole(2), SubmissionController.getSubmissionsByExamPeriodId);
router.get('/user/:userId', auth, SubmissionController.getSubmissionsByUserId);
router.get('/user-and-exam-period/:userId/:examPeriodId', auth, SubmissionController.getSubmissionsByUserAndExamPeriod);

module.exports = router;
