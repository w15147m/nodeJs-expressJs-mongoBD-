const express = require("express");
const path = require("path");
const { rootDir } = require("../utils/pathUtil");

const contactRouter = express.Router();

contactRouter.get('/contact', (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'contactFrom.html'));
});

module.exports = contactRouter;
