const express = require("express");
const fs = require("fs");
const path = require("path");
const { rootDir } = require("../utils/pathUtil");

const contactPostRouter = express.Router();

// Contact - save message to sms.txt
contactPostRouter.post("/contact", (req, res) => {
  const { name, message } = req.body;
  const entry = `[${new Date().toLocaleString()}] ${name}: ${message}\n`;

  fs.appendFile(path.join(__dirname, "../sms.txt"), entry, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Could not save your message.");
    }
    res.sendFile(path.join(rootDir, "views", "contactMassage.html"));
  });
});

module.exports = contactPostRouter;
