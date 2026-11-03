const express = require("express");
const { about } = require("../controllers/homeController");

const aboutRouter = express.Router();

aboutRouter.get("/about", about);

module.exports = aboutRouter;
