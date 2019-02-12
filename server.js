const express = require("express");
const port = 5000;

// import Routes

//init server
const server = express();

//middleware
server.use(express.json());

//use server

server.listen(5000, () => {
  console.log(`++++++++ Server running on port ${port} ++++++++`);
});
