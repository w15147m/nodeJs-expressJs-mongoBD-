const express = require("express");
const path = require("path");
const { rootDir } = require("../utils/pathUtil");

const aboutRouter = express.Router();

aboutRouter.get('/about', (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'about.html'));
});

module.exports = aboutRouter;
