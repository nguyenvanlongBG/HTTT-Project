const express = require('express');
const router = express.Router();
const ClassEnrollController = require('./classenrollment.controller');
const { auth, checkRole } = require('../../middleware/auth');

router.post('/', auth, ClassEnrollController.createEnrollmentRequest);
router.get('/:classId', auth, ClassEnrollController.getEnrollmentRequestsByClassId);
router.put('/update-status', auth, ClassEnrollController.updateEnrollmentStatus);

module.exports = router;