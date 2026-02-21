const Notice = require('../models/Notice');
const { getIo } = require('../socket');

// @desc    Create Global Announcement
// @route   POST /api/notices
// @access  Private (Admin, Principal, Teacher)
const createNotice = async (req, res) => {
    const { title, message, audience } = req.body;

    try {
        const notice = await Notice.create({
            title,
            message,
            audience,
            postedBy: req.user._id
        });

        // Broadcast via Socket.io
        const io = getIo();
        io.emit('receive_notice', {
            title,
            message,
            audience,
            date: notice.date,
            postedBy: req.user.name
        });

        res.status(201).json(notice);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get All Notices
// @route   GET /api/notices
// @access  Public (Authenticated)
const getNotices = async (req, res) => {
    try {
        // Filter by audience logic if needed, but for now return all or filter in frontend
        const notices = await Notice.find().sort({ date: -1 }).populate('postedBy', 'name role');
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createNotice, getNotices };
