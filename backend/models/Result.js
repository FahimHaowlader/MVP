const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    examType: {
        type: String, // e.g., "Midterm", "Final"
        required: true
    },
    className: {
        type: String,
        required: true
    },
    subjects: [{
        subject: { type: String, required: true },
        marks: { type: Number, required: true },
        totalMarks: { type: Number, default: 100 },
        grade: { type: String }
    }],
    totalMarks: {
        type: Number,
        default: 0
    },
    average: {
        type: Number,
        default: 0
    },
    cgpa: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Result', ResultSchema);
