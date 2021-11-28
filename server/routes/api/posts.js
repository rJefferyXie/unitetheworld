const express = require("express");
const router = express.Router();

const ObjectId = require("mongodb").ObjectId;

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

// @route POST api/posts/create
// @desc Create a new post
// @access Public
router.post("/create", (req, res) => {
    let newPost = new Post({
        creator: req.body.creator,
        name: req.body.name,
        location: req.body.location,
        limit: req.body.limit
    });
    newPost.save((err, suc) => {
        if (err) { throw err }
        console.log("New post created.");
    });
});

router.post("/join/:id", (req, res) => {
    let myquery = { _id: ObjectId( req.params.id )};
    let newValues = {
        $push: {
            participants: req.body.name,
        }
    };
    Post.updateOne(myquery, newValues, (err, user) => {
        if (err) { throw err }
        console.log(req.body.name + "added to event list.");
        res.json(user);
    });
});

router.post("/leave/:id", (req, res) => {
    let myquery = { _id: ObjectId( req.params.id )};
    let newValues = {
        $pull: {
            participants: req.body.name,
        }
    };
    Post.updateOne(myquery, newValues, (err, user) => {
        if (err) { throw err }
        console.log(req.body.name + "removed from event list.");
        res.json(user);
    });
});

router.post("/complete/:id", (req, res) => {
    Post.findById(ObjectId(req.params.id)).then(post => {
        post.participants.forEach(name => {
            User.findOne({name}).then(user => {
                const performance = Math.floor(Math.random() * 5) + 1;
                user.events.push([post.name, post.location, performance]);
                user.rating += performance;
                user.save();
            });
        });
    });
    Post.deleteOne({_id: req.params.id}, (err, result) => {
        if (err) { throw err }
        console.log("Event completed.");
    })
});

router.delete("/delete/:id", (req, res) => {
    Post.deleteOne({_id: req.params.id}, (err, result) => {
        if (err) { throw err };
        console.log("Post removed from database.");
    });
})

module.exports = router;