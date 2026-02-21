const Fee = require('../models/Fee');
const User = require('../models/User');

// @desc    Create Fee Invoice
// @route   POST /api/fees
// @access  Private (Admin, Accountant)
const createFee = async (req, res) => {
    const { studentId, title, amount, dueDate } = req.body;

    try {
        const student = await User.findById(studentId);
        if (!student || student.role !== 'Student') {
            return res.status(404).json({ message: 'Student not found' });
        }

        const fee = await Fee.create({
            student: studentId,
            title,
            amount,
            dueDate
        });

        // Here we could trigger a notification (Email/Socket)

        res.status(201).json(fee);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get Student Fees
// @route   GET /api/fees/:studentId
// @access  Private (Admin, Accountant, Student, Parent)
const getFees = async (req, res) => {
    try {
        const { studentId } = req.params;
        const fees = await Fee.find({ student: studentId });
        res.status(200).json(fees);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Pay Fee
// @route   PUT /api/fees/:id/pay
// @access  Private (Admin, Accountant - For MVP. In real app, Student pays via Gateway)
const payFee = async (req, res) => {
    try {
        const fee = await Fee.findById(req.params.id);
        if (!fee) return res.status(404).json({ message: 'Fee not found' });

        fee.status = 'Paid';
        fee.paymentDate = Date.now();
        await fee.save();

        res.status(200).json(fee);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createFee,
    getFees,
    payFee
};
