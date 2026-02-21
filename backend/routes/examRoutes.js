const express = require('express');
const router = express.Router();
const { addExamResult, getExamResults } = require('../controllers/examController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('Admin', 'Teacher'), addExamResult);
router.get('/:studentId', protect, authorize('Admin', 'Teacher', 'Student', 'Parent'), getExamResults);

module.exports = router;
