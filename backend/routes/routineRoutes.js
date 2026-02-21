const express = require('express');
const router = express.Router();
const { createRoutine, getRoutine, getTeacherRoutine } = require('../controllers/routineController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('Admin', 'Teacher', 'Principal'), createRoutine);
router.get('/:className/:section', protect, getRoutine);
router.get('/teacher/:teacherId', protect, getTeacherRoutine);

module.exports = router;
