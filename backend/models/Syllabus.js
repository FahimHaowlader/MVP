const mongoose = require('mongoose');

const SyllabusSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    className: {
        type: String, // e.g., "Class 10"
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String, // Store path or URL to file
        required: true
    },
    type: {
        type: String,
        enum: ['Syllabus', 'Assignment'],
        default: 'Syllabus'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Syllabus', SyllabusSchema);
