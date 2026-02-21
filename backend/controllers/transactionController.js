const Transaction = require('../models/Transaction');
const User = require('../models/User');

// @desc    Create transaction (Fee Payment)
// @route   POST /api/transactions
// @access  Private (Accountant, Admin)
const addTransaction = async (req, res) => {
    const { userId, amount, type, status } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const transaction = await Transaction.create({
            user: userId,
            amount,
            type,
            status
        });

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get transactions
// @route   GET /api/transactions/:userId
// @access  Private (Admin, Accountant, User (own))
const getTransactions = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Access Control
        if (req.user.role !== 'Admin' && req.user.role !== 'Accountant' && req.user.id !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const transactions = await Transaction.find({ user: userId }).populate('user', 'name email');
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    addTransaction,
    getTransactions
};
