const express = require('express');
const router = express.Router();
const { addTransaction, getTransactions } = require('../controllers/transactionController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('Admin', 'Accountant'), addTransaction);
router.get('/:userId', protect, authorize('Admin', 'Accountant', 'Student', 'Parent', 'Teacher'), getTransactions); // Assuming Teacher might also pay? Or just generic User access.

module.exports = router;
