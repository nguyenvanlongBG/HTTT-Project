const express = require('express');
const router = express.Router();
const SubjectController = require('./subject.controller');
const { auth, checkRole } = require('../../middleware/auth');

router.post('/create', auth, checkRole(2), SubjectController.createSubject);
router.get('/all', SubjectController.getSubjects);
router.get('/:subjectId', SubjectController.getSubjectById);
router.put('/:subjectId', auth, checkRole(2), SubjectController.updateSubject);
router.delete('/:subjectId', auth, checkRole(2), SubjectController.deleteSubject);

module.exports = router;
