const mongoose = require('mongoose');


const GroupSchema = mongoose.Schema({
    admin: {
        type: String,
    },
    userId: {
        type: String
    },
    groupName: {
        type: String,
    },
    members: {
        type: Array,
        default: []
    },
    messages: {
        type: Array,
        default: []
    },
    groupPicture: {
        data: Buffer,
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Group', GroupSchema);