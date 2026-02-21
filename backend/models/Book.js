const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        unique: true
    },
    totalCopies: {
        type: Number,
        required: true,
        default: 1
    },
    availableCopies: {
        type: Number,
        required: true,
        default: 1
    },
    status: {
        type: String,
        enum: ['Available', 'Out of Stock'],
        default: 'Available'
    }
});

module.exports = mongoose.model('Book', BookSchema);
