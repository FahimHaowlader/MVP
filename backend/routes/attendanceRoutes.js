const express = require('express');
const router = express.Router();
const { markAttendance, getAttendance } = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('Admin', 'Teacher'), markAttendance);
router.get('/:studentId', protect, authorize('Admin', 'Teacher', 'Student', 'Parent'), getAttendance);

module.exports = router;
