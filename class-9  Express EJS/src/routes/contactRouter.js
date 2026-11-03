const express = require("express");
const { getContact } = require("../controllers/homeController");

const contactRouter = express.Router();

contactRouter.get("/contact", getContact);

module.exports = contactRouter;
