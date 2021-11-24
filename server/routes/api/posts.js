const express = require("express");
const router = express.Router();

// Load user model
const Post = require("../../models/Post");

// @route GET api/posts/summary
// @desc Get all current posts
// @access Public
router.get("/summary", (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) throw err
        res.json(posts);
    });
});

// @route POST api/users/register
// @desc Create a new post
// @access Public
router.post("/register", (req, res) => {
    let newPost = {
        name: req.body.name,
        location: req.body.location,
        limit: req.body.limit
    }
    Post.insertOne(newPost, (err, suc) => {
        if (err) { throw err }
        res.json(res);
    });
});

module.exports = router;