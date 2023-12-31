const express = require('express');
const router = express.Router();
const classesController = require('./classes.controller');
const { auth, checkRole } = require('../../middleware/auth');

// Routes
router.post('/', auth, checkRole(2), classesController.createClasses);
router.get('/:ClassesId', auth, classesController.getClassesById);
router.patch('/:ClassesId', auth, checkRole(2), classesController.updateClasses);
router.delete('/:ClassesId', auth, checkRole(2), classesController.deleteClasses);
router.get('/user/:userId', auth, classesController.getClassesByUserId);
router.post('/:ClassesId/add-student', auth, checkRole(2), classesController.addStudentToClasses);
router.delete('/:ClassesId/remove-student', auth, checkRole(2), classesController.removeStudentFromClasses);
router.get('/:ClassesId/students', auth, classesController.getStudentsInClasses);

module.exports = router;
