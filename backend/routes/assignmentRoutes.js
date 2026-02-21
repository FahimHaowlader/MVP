const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Create an assignment
// @route   POST /api/assignments
// @access  Teacher
router.post('/', protect, authorize('Teacher'), async (req, res) => {
    try {
        const { title, description, subject, className, dueDate, fileUrl } = req.body;
        const assignment = new Assignment({
            title,
            description,
            subject,
            className,
            teacher: req.user._id,
            dueDate,
            fileUrl
        });
        await assignment.save();
        res.status(201).json(assignment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Get assignments for a class
// @route   GET /api/assignments/:className
// @access  Student, Teacher
router.get('/:className', protect, async (req, res) => {
    try {
        const assignments = await Assignment.find({ className: req.params.className }).populate('teacher', 'name');
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Submit an assignment
// @route   POST /api/assignments/:id/submit
// @access  Student
router.post('/:id/submit', protect, authorize('Student'), async (req, res) => {
    try {
        const { fileUrl } = req.body;

        // Check if already submitted
        const existingSubmission = await Submission.findOne({
            assignment: req.params.id,
            student: req.user._id
        });

        if (existingSubmission) {
            return res.status(400).json({ message: 'Assignment already submitted' });
        }

        const submission = new Submission({
            assignment: req.params.id,
            student: req.user._id,
            fileUrl
        });
        await submission.save();
        res.status(201).json(submission);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Get submissions for an assignment
// @route   GET /api/assignments/:id/submissions
// @access  Teacher
router.get('/:id/submissions', protect, authorize('Teacher'), async (req, res) => {
    try {
        const submissions = await Submission.find({ assignment: req.params.id }).populate('student', 'name email');
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
