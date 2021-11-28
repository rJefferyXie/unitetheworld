const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");

const db = require("./config/keys").ATLAS_URI;
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Mongoose connected to the server."))
  .catch(err => console.log("Mongoose could not connect to server."))

// Setup passport
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/posts", posts);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
