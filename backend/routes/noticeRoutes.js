const express = require('express');
const router = express.Router();
const { createNotice, getNotices } = require('../controllers/noticeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('Admin', 'Principal', 'Teacher'), createNotice);
router.get('/', protect, getNotices);

module.exports = router;
