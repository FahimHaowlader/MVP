const mongoose = require('mongoose');

const RoutineSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    timeSlot: {
        type: String,
        required: true // e.g., "09:00 AM - 10:00 AM"
    },
    subject: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Routine', RoutineSchema);
