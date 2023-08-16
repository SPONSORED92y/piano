const mongoose = require('mongoose')
const BoxSchema = new mongoose.Schema({
    period: {
        type: Number,
        required: [true, 'period is empty'],
    },
    week: {
        type: Number,
        required: [true, 'week is empty'],
        enum: [1, 2],
    },
    room: {
        type: Number,
        required: [true, 'room is empty'],
        enum: [1, 2, 3],
    },
    status: {
        type: String,
        required: [true, 'status is empty'],
        enum: ['Available', 'Not Available', 'Occupied'],
        default: 'Available',
    },
    user: {
        type: String,
        default: '',
    },
});

module.exports = mongoose.model('Box', BoxSchema);