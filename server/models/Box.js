const mongoose = require("mongoose");
const BoxSchema = new mongoose.Schema({
    period: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        required: [true, 'status is empty'],
        enum: ["Available", "Not Available","Occupied"],
        default: "Available",
    },
    user: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("Box", BoxSchema);