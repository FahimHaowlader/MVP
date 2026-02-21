const express = require('express');
const router = express.Router();
const { createFee, getFees, payFee } = require('../controllers/feeController');
const { addBook, getBooks, issueBook, returnBook, getTransactions } = require('../controllers/libraryController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Fees Routes
router.post('/fees', protect, authorize('Admin', 'Accountant'), createFee);
router.get('/fees/:studentId', protect, getFees);
router.put('/fees/:id/pay', protect, authorize('Admin', 'Accountant'), payFee);

// Library Routes
router.post('/library', protect, authorize('Librarian', 'Admin', 'Principal'), addBook);
router.get('/library', protect, getBooks);
router.post('/library/issue', protect, authorize('Librarian', 'Admin'), issueBook);
router.post('/library/return', protect, authorize('Librarian', 'Admin'), returnBook);
router.get('/library/transactions', protect, authorize('Librarian', 'Admin'), getTransactions);

module.exports = router;
