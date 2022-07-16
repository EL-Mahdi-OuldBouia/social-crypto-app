const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    friendId: {
        type: String,
        required: true
    },
    messages: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Message', MessageSchema);