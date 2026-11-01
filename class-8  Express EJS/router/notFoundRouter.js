const express = require("express");
const path = require("path");
const { rootDir } = require("../utils/pathUtil");

const notFoundRouter = express.Router();

notFoundRouter.use((req, res) => {
  res.status(404).sendFile(path.join(rootDir, 'views', 'notFound.html'));
});

module.exports = notFoundRouter;
