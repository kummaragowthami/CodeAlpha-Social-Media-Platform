const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static("public"));

let users = [];

let posts = [];

let comments = [];

/* User Profile */

app.post("/users", (req, res) => {

  const user = {
    id: Date.now(),
    name: req.body.name,
    following: []
  };

  users.push(user);

  res.json(user);

});

app.get("/users", (req, res) => {

  res.json(users);

});

/* Posts */

app.post("/posts", (req, res) => {

  const post = {

    id: Date.now(),

    username: req.body.username,

    content: req.body.content,

    likes: 0

  };

  posts.push(post);

  res.json(post);

});

app.get("/posts", (req, res) => {

  res.json(posts);

});

/* Like System */

app.put("/posts/like/:id", (req, res) => {

  const post = posts.find(

    p => p.id == req.params.id

  );

  if (post) {

    post.likes++;

  }

  res.json(post);

});

/* Comments */

app.post("/comments", (req, res) => {

  const comment = {

    id: Date.now(),

    postId: req.body.postId,

    username: req.body.username,

    text: req.body.text

  };

  comments.push(comment);

  res.json(comment);

});

app.get("/comments/:postId",

(req, res) => {

  const result = comments.filter(

    c => c.postId == req.params.postId

  );

  res.json(result);

});

/* Follow System */

app.put("/follow", (req, res) => {

  const user = users.find(

    u => u.name == req.body.user

  );

  if (user) {

    user.following.push(

      req.body.followPerson

    );

  }

  res.json(user);

});

app.listen(5000, () => {

  console.log(

    "Server running on port 5000"

  );

});