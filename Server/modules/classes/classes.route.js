const express = require('express');
const router = express.Router();
const classesController = require('./classes.controller');
const { auth, checkRole } = require('../../middleware/auth');

// Routes
router.post('/', auth, checkRole(2), classesController.createClasses);
router.get('/:id', auth, classesController.getClassesById);
router.patch('/:id', auth, checkRole(2), classesController.updateClasses);
router.delete('/:id', auth, checkRole(2), classesController.deleteClasses);
router.get('/:userid', auth, classesController.getClassesByUserId);
router.post('/:id/add-student', auth, checkRole(2), classesController.addStudentToClasses);
router.delete('/:id/remove-student', auth, checkRole(2), classesController.removeStudentFromClasses);
router.get('/:id/students', auth, classesController.getStudentsInClasses);

module.exports = router;
