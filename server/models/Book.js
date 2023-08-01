const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is empty'],
        unique: true
    },
    status: {
        type: String,
        required: [true, 'status is empty'],
        enum: ["Available", "Not Available"],
        default: "Available",
    },
    borrower: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("Book", BookSchema);