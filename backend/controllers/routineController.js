const Routine = require('../models/Routine');

// @desc    Create or Update Routine Item
// @route   POST /api/routines
// @access  Private (Admin, Teacher)
const createRoutine = async (req, res) => {
    const { className, section, day, timeSlot, subject, teacherId } = req.body;

    try {
        // Validation could be added here to check for conflicts (e.g. teacher double-booked)

        const routine = await Routine.create({
            className,
            section,
            day,
            timeSlot,
            subject,
            teacher: teacherId
        });

        res.status(201).json(routine);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get Routine by Class and Section
// @route   GET /api/routines/:className/:section
// @access  Public (Authenticated Users)
const getRoutine = async (req, res) => {
    try {
        const { className, section } = req.params;
        const routine = await Routine.find({ className, section }).populate('teacher', 'name email');
        res.status(200).json(routine);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get Teacher's Routine
// @route   GET /api/routines/teacher/:teacherId
// @access  Private
const getTeacherRoutine = async (req, res) => {
    try {
        const routine = await Routine.find({ teacher: req.params.teacherId }).populate('teacher', 'name');
        res.status(200).json(routine);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    createRoutine,
    getRoutine,
    getTeacherRoutine
};
