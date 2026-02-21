const Exam = require('../models/Exam');
const User = require('../models/User');
const { getIo } = require('../socket');

// @desc    Add exam result
// @route   POST /api/exams
// @access  Private (Teacher, Admin)
const addExamResult = async (req, res) => {
    const { studentId, subject, grade, date } = req.body;

    try {
        const student = await User.findById(studentId);
        if (!student || student.role !== 'Student') {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Auto-calculate GPA based on grade (Assuming grade is percentage for this example)
        let gpa = 0.0;
        if (grade >= 80) gpa = 5.0;
        else if (grade >= 70) gpa = 4.0;
        else if (grade >= 60) gpa = 3.5;
        else if (grade >= 50) gpa = 3.0;
        else if (grade >= 40) gpa = 2.0;
        else gpa = 0.0;

        const exam = await Exam.create({
            student: studentId,
            subject,
            grade,
            gpa, // Store calculated GPA
            date: date || Date.now()
        });

        // Notify Parent/Student via Socket.io
        try {
            const io = getIo();
            io.emit('result_published', {
                studentId,
                subject,
                grade,
                message: `Result for ${subject} is out!`
            });
        } catch (socketError) {
            console.error("Socket emission failed:", socketError.message);
        }

        res.status(201).json(exam);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get exam results
// @route   GET /api/exams/:studentId
// @access  Private (Admin, Teacher, Student (own), Parent)
const getExamResults = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        // Access Control
        if (req.user.role === 'Student' && req.user.id !== studentId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const exams = await Exam.find({ student: studentId }).populate('student', 'name email');
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    addExamResult,
    getExamResults
};
