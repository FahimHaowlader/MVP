const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get all users (Directory)
// @route   GET /api/users
// @access  Principal, Admin
router.get('/', protect, authorize('Principal', 'Admin'), async (req, res) => {
    try {
        const { role } = req.query;
        let query = {};
        if (role) {
            query.role = role;
        }

        const users = await User.find(query).select('-password').sort({ name: 1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Get students by class and section
// @route   GET /api/users/students
// @access  Teacher, Principal, Admin
router.get('/students', protect, authorize('Teacher', 'Principal', 'Admin'), async (req, res) => {
    try {
        const { className, section } = req.query;
        let query = { role: 'Student' };
        if (className) query.className = className;
        if (section) query.section = section;

        const students = await User.find(query).select('name email role className section').sort({ name: 1 });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

