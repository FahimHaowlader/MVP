const Book = require('../models/Book');
const LibraryTransaction = require('../models/LibraryTransaction');

// @desc    Add Book
// @route   POST /api/library
// @access  Private (Librarian, Admin, Principal)
const addBook = async (req, res) => {
    const { title, author, isbn, totalCopies } = req.body;

    try {
        const book = await Book.create({
            title,
            author,
            isbn,
            totalCopies,
            availableCopies: totalCopies
        });
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get All Books
// @route   GET /api/library
// @access  Public (Authenticated)
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Issue Book
// @route   POST /api/library/issue
// @access  Private (Librarian, Admin)
const issueBook = async (req, res) => {
    const { bookId, userId, dueDate } = req.body;

    try {
        const book = await Book.findById(bookId);
        if (!book || book.availableCopies <= 0) {
            return res.status(400).json({ message: 'Book not available' });
        }

        const transaction = await LibraryTransaction.create({
            book: bookId,
            user: userId,
            dueDate
        });

        book.availableCopies -= 1;
        if (book.availableCopies === 0) book.status = 'Out of Stock';
        await book.save();

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Return Book
// @route   POST /api/library/return
// @access  Private (Librarian, Admin)
const returnBook = async (req, res) => {
    const { transactionId } = req.body;

    try {
        const transaction = await LibraryTransaction.findById(transactionId);
        if (!transaction || transaction.status === 'Returned') {
            return res.status(400).json({ message: 'Invalid transaction' });
        }

        transaction.returnDate = Date.now();
        transaction.status = 'Returned';
        await transaction.save();

        const book = await Book.findById(transaction.book);
        book.availableCopies += 1;
        book.status = 'Available';
        await book.save();

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get All Transactions
// @route   GET /api/library/transactions
// @access  Private (Librarian, Admin)
const getTransactions = async (req, res) => {
    try {
        const transactions = await LibraryTransaction.find()
            .populate('book', 'title')
            .populate('user', 'name email role')
            .sort({ issueDate: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    addBook,
    getBooks,
    issueBook,
    returnBook,
    getTransactions
};
