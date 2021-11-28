const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    creator: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    limit: {
        type: Number,
        required: true
    },
    participants: [String],
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Post = mongoose.model("posts", PostSchema);