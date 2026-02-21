const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Add a result
// @route   POST /api/results
// @access  Teacher
router.post('/', protect, authorize('Teacher'), async (req, res) => {
    try {
        const { student, examType, className, subjects } = req.body;

        // Calculate total marks and Average
        let totalMarks = 0;
        subjects.forEach(sub => totalMarks += sub.marks);
        const average = totalMarks / subjects.length;

        const result = new Result({
            student,
            examType,
            className,
            subjects,
            totalMarks,
            average
        });

        await result.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Add bulk results
// @route   POST /api/results/bulk
// @access  Teacher
router.post('/bulk', protect, authorize('Teacher'), async (req, res) => {
    try {
        const { results } = req.body; // Array of { student, examType, className, subjects }

        const savedResults = await Promise.all(results.map(async (r) => {
            let totalMarks = 0;
            r.subjects.forEach(sub => totalMarks += sub.marks);
            const average = totalMarks / r.subjects.length;

            return await Result.findOneAndUpdate(
                { student: r.student, examType: r.examType, className: r.className },
                { ...r, totalMarks, average },
                { upsert: true, new: true }
            );
        }));

        res.status(200).json(savedResults);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// @desc    Get results for a student
// @route   GET /api/results/my
// @access  Student
router.get('/my', protect, authorize('Student'), async (req, res) => {
    try {
        const results = await Result.find({ student: req.user._id }).sort({ date: -1 });
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
