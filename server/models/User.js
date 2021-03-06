const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    events: [[String]],
    rating: {
        type: Number,
        default: 0
    },
    access: {
        type: String,
        default: "User"
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = User = mongoose.model("users", UserSchema);