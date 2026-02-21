const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const Fee = require('../models/Fee');
const Assignment = require('../models/Assignment');
const Event = require('../models/Event'); // Added Event model
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get student dashboard data
// @route   GET /api/student/dashboard
// @access  Student
router.get('/dashboard', protect, authorize('Student'), async (req, res) => {
    try {
        const studentId = req.user._id;

        // Parallel data fetching
        const [results, fees, events] = await Promise.all([
            Result.find({ student: studentId }).sort({ date: -1 }).limit(5),
            Fee.find({ student: studentId, status: 'Unpaid' }),
            Event.find({ date: { $gte: new Date() } }).sort({ date: 1 }).limit(3)
        ]);

        res.json({
            recentResults: results,
            pendingFees: fees,
            upcomingEvents: events
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Get student aggregated details
// @route   GET /api/student/profile
// @access  Student
router.get('/profile', protect, authorize('Student'), async (req, res) => {
    try {
        const student = await User.findById(req.user._id).select('-password');
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
