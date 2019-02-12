const express = require("express");
const port = 5000;
// import Routes
const postRoutes = require("./routes/api/posts");
//init server
const server = express();
//middleware
server.use(express.json());
//use server
server.use("/api/posts", postRoutes);
//listenting server
server.listen(port, () => {
  console.log(`++++++++ Server running on port ${port} ++++++++`);
});
