const express = require("express");
const server = express.Router();
const db = require("../../data/db");

server.get("/", (req, res) => {
  db.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved" });
    });
});

module.exports = server;
