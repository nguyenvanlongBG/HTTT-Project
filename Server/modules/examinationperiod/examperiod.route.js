const express = require('express');
const router = express.Router();
const ExamPeriodController = require('./examperiod.controller');
const { auth, checkRole } = require('../../middleware/auth');

router.post('/create', auth, checkRole(2), ExamPeriodController.createExamPeriod);
// router.put('/add-students/:examPeriodId', ExamPeriodController.addStudentsToExamPeriod);
router.get('/all', auth, ExamPeriodController.getExamPeriods);

// Cho phép Giáo viên xem toàn bộ thông tin
router.get('/:examPeriodId', auth, checkRole(2), ExamPeriodController.getExamPeriodById);

// Cho phép Học sinh xem thông tin trừ exam_format
router.get('/:examPeriodId/student-view', auth, checkRole(1), ExamPeriodController.getExamPeriodForStudent);

router.put('/:examPeriodId', auth, checkRole(2), ExamPeriodController.updateExamPeriod);
router.delete('/:examPeriodId', auth, checkRole(2), ExamPeriodController.deleteExamPeriod);

router.get('/class/:classId', auth, ExamPeriodController.getExamPeriodsForClass);
router.put('/add-students/:examPeriodId', auth, checkRole(2), ExamPeriodController.addStudentsFromClassToExamPeriod);

module.exports = router;
