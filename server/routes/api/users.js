const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys")

// Load register / login validation
const validateUserRegister = require("../../validation/register");
const validateUserLogin = require("../../validation/login");

// Load user model
const User = require("../../models/User");

// @route GET api/users/summary
// @desc Get all user accounts
// @access Private
router.get("/summary", (req, res) => {
    User.find({}, (err, users) => {
        if (err) throw err
        res.json(users);
    });
});

// @route DELETE api/users/:id
// @desc Delete user account
// @access Private
router.delete("/:id", (req, res) => {
    User.deleteOne({_id: req.params.id}, (err, result) => {
        if (err) { throw err }
        console.log("User removed from database.");
    });
});



// @route POST api/users/register
// @desc Register new user
// @access Public
router.post("/register", (req, res) => {
    const { errors, isValid } = validateUserRegister(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists." });
        }
        else {
            User.findOne({ name: req.body.name })
            .then(user => {
                if (user) {
                    return res.status(400).json({ name: "Username already exists. "});
                }
                else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    });
                
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) { throw err; }
                            newUser.password = hash;
                            newUser.save()
                            .then(newuser => res.json(newuser))
                            .then(console.log("New Account Created."))
                            .catch(err => console.log(err));
                        });
                    });
                }
            });
        }
    })
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    const { errors, isValid } = validateUserLogin(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found." });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // Found a match, create JWT payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    access: user.access
                };

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        })
                        .then(console.log("Logged in to account.")
                        );
                    }
                );
            } else {
                return res.status(400).json({ passwordincorrect: "Password incorrect."} );
            }
        });
    });
});

module.exports = router;