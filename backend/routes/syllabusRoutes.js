const express = require('express');
const router = express.Router();
const { uploadSyllabus, getSyllabus } = require('../controllers/syllabusController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('Admin', 'Teacher'), uploadSyllabus);
router.get('/:className', protect, getSyllabus);
router.get('/student/all', protect, async (req, res) => {
    // innovative fix: just return all for MVP or specific class if we had user profile logic
    // For now, let's just use the controller or a direct find if controller not handy
    // But better to use controller. Let's redirect to controller with a param or specific logic
    // Actually, let's just make it flexible.
    try {
        const Syllabus = require('../models/Syllabus');
        // Ideally we filter by student's class. 
        // For MVP, returning all or a dummy list if no class match
        const syllabus = await Syllabus.find({});
        res.json(syllabus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
