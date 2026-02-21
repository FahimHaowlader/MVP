const Attendance = require('../models/Attendance');
const User = require('../models/User');

// @desc    Mark attendance
// @route   POST /api/attendance
// @access  Private (Teacher, Admin)
const markAttendance = async (req, res) => {
    const { studentId, status, date } = req.body;

    try {
        const student = await User.findById(studentId);
        if (!student || student.role !== 'Student') {
            return res.status(404).json({ message: 'Student not found' });
        }

        const attendance = await Attendance.create({
            student: studentId,
            status,
            date: date || Date.now()
        });

        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get attendance
// @route   GET /api/attendance/:studentId
// @access  Private (Admin, Teacher, Student (own), Parent (child))
const getAttendance = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        // Access Control Logic
        if (req.user.role === 'Student' && req.user.id !== studentId) {
            return res.status(403).json({ message: 'Not authorized to view this attendance' });
        }
        // Note: For Parent, we'd need a link between Parent and Student. 
        // For MVP, assuming Parent tells us the Student ID and we just trust or checking DB for relationship.
        // Simplifying for MVP: Admin/Teacher can access anyone. Student can access own.

        const attendance = await Attendance.find({ student: studentId }).populate('student', 'name email');
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    markAttendance,
    getAttendance
};
