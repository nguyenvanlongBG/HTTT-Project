const express = require('express');
const router = express.Router();
const ClassEnrollController = require('./classenrollment.controller');

router.post('/', ClassEnrollController.createEnrollmentRequest);
router.get('/:classId', ClassEnrollController.getEnrollmentRequestsByClassId);
router.put('/update-status', ClassEnrollController.updateEnrollmentStatus);

module.exports = router;