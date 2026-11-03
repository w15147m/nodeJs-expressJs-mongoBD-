const express = require("express");
const { postContact } = require("../controllers/homeController");

const contactPostRouter = express.Router();

contactPostRouter.post("/contact", postContact);

module.exports = contactPostRouter;
