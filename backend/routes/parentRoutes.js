const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Result = require('../models/Result');
const Fee = require('../models/Fee');
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get my children
// @route   GET /api/parent/children
// @access  Parent
router.get('/children', protect, authorize('Parent'), async (req, res) => {
    try {
        const parent = await User.findById(req.user._id).populate('children', 'name email className section');
        res.json(parent.children);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Get overview for a specific child
// @route   GET /api/parent/child/:childId/overview
// @access  Parent
router.get('/child/:childId/overview', protect, authorize('Parent'), async (req, res) => {
    try {
        const { childId } = req.params;

        // Verify this child belongs to this parent
        const parent = await User.findById(req.user._id);
        if (!parent.children.some(id => id.toString() === childId)) {
            return res.status(403).json({ message: 'Not authorized to view this student' });
        }

        const [attendance, recentResults, pendingFees] = await Promise.all([
            Attendance.find({ student: childId }).sort({ date: -1 }).limit(5),
            Result.find({ student: childId }).sort({ date: -1 }).limit(3),
            Fee.find({ student: childId, status: 'Unpaid' })
        ]);

        res.json({
            attendance,
            recentResults,
            pendingFees
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
