const express = require("express");

const homeRouter = express.Router();
const path =  require('path');

const { rootDir } = require("../utils/pathUtil");


homeRouter.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'home.html'))
});


module.exports = homeRouter;
