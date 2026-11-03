const express = require("express");
const { home } = require("../controllers/homeController");

const homeRouter = express.Router();

homeRouter.get("/", home);

module.exports = homeRouter;
