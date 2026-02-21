const Syllabus = require('../models/Syllabus');

// @desc    Upload Syllabus/Assignment (Simulated)
// @route   POST /api/syllabus
// @access  Private (Teacher, Admin)
const uploadSyllabus = async (req, res) => {
    const { title, description, className, subject, fileUrl, type } = req.body;

    try {
        const syllabus = await Syllabus.create({
            title,
            description,
            className,
            subject,
            fileUrl,
            type,
            teacher: req.user.id
        });

        res.status(201).json(syllabus);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get Syllabus/Assignments
// @route   GET /api/syllabus/:className
// @access  Public (Authenticated)
const getSyllabus = async (req, res) => {
    try {
        const { className } = req.params;
        const materials = await Syllabus.find({ className }).populate('teacher', 'name');
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    uploadSyllabus,
    getSyllabus
};
