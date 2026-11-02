const express = require("express");

const aboutRouter = express.Router();

aboutRouter.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

module.exports = aboutRouter;
