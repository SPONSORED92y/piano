const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is empty'],
    },
    content: {
        type: String,
    },
    date: {
        type: Date,
    }
});

module.exports = mongoose.model('Post', PostSchema);