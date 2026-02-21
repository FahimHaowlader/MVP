const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Create an event
// @route   POST /api/events
// @access  Admin
router.post('/', protect, authorize('Admin', 'Principal'), async (req, res) => {
    try {
        const { title, description, date, type } = req.body;
        const event = new Event({ title, description, date, type });
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Get all events
// @route   GET /api/events
// @access  Public
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
