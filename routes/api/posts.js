const express = require("express");
const server = express.Router();
const db = require("../../data/db");

// @route    GET api/posts
// @desc     Fetch All Post
// @Access   Public
server.get("/", (req, res) => {
  db.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});
// @route    POSt api/posts
// @desc     Post
// @Access   Public
server.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title) {
    res.status(400).json({ message: "Please provide title  for the post." });
  }
  if (!contents) {
    res.status(400).json({ message: "Please provide  contents for the post." });
  }
  db.insert(req.body)
    .then(post => {
      db.find()
        .then(post => {
          res.status(200).json(post);
        })
        .catch(err => {
          res
            .status(500)
            .json({ message: "The posts information could not be retrieved" });
        });
      // res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error while saving the post to the database"
      });
    });
});
// @route    GET api/posts/:id
// @desc     Fetch Single Post
// @Access   Public
server.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (!post.length) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});
// @route    DELETE api/posts/:id
// @desc     Delete Single Post
// @Access   Public
server.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(posts => {
      console.log("posts", posts);
      if (posts > 0) {
        db.find()
          .then(post => {
            console.log(post);
            res.status(200).json(post);
          })
          .catch(err => {
            res.status(500).json({
              message: "The posts information could not be retrieved"
            });
          });
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist"
        });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ success: false, message: "The user could not be removed" })
    );
});

// @route    UPDATE api/posts/:id
// @desc     Update Single Post
// @Access   Public
server.put("/:id", (req, res) => {
  const { id } = req.params;
  const { contents, title } = req.body;
  if (!contents) {
    res.status(400).json({ message: "Please provide  contents for the post." });
  }
  if (!title) {
    res.status(400).json({ message: "Please provide title  for the post." });
  }
  db.update(id, req.body)
    .then(posts => {
      if (posts) {
        db.find()
          .then(post => {
            console.log(post);
            res.status(200).json(post);
          })
          .catch(err => {
            res.status(500).json({
              message: "The posts information could not be retrieved"
            });
          });
        // res.status(200).json(posts);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The post information could not be modified." });
    });
});

module.exports = server;
