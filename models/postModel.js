const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post must habe title'],
    },
    body: {
        type: String,
        required: [true, 'Post must habe body'],
    },
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post