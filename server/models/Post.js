const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        max: 100
    },
    img: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    },
    conmments: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("Post", PostSchema);