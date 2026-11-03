const express = require("express");
const { pageNotFound } = require("../controllers/homeController");

const notFoundRouter = express.Router();

notFoundRouter.use(pageNotFound);

module.exports = notFoundRouter;
