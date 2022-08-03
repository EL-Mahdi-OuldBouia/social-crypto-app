const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userRealName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ""
    },
    city: {
        type: String,
    },
    country: {
        type: String
    },
    relationship: {
        type: String
    },
    isAdded: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ProfileInfo', ProfileSchema);