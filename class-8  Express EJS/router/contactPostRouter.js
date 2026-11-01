const express = require("express");
const fs = require("fs");
const path = require("path");

const contactPostRouter = express.Router();

const nav = require("../src/components/nav");
const layout = require("../src/layout");

// Contact - save message to sms.txt
contactPostRouter.post("/contact", (req, res) => {
  const { name, message } = req.body;
  const entry = `[${new Date().toLocaleString()}] ${name}: ${message}\n`;

  fs.appendFile(path.join(__dirname, "../sms.txt"), entry, (err) => {
    if (err) {
      console.error(err);
      res.status(500);
      return layout(
        res,
        `
        ${nav}
        <main class="card">
          <h1>Something went wrong</h1>
          <p class="subtitle">Could not save your message.</p>
          <div class="actions">
            <a class="btn" href="/contact">Try again</a>
          </div>
        </main>
      `,
        "Error"
      );
    }
    layout(
      res,
      `
      ${nav}
      <main class="card">
        <div class="badge-success">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1>Thank you!</h1>
        <p class="subtitle">Your message has been saved.</p>
        <div class="actions">
          <a class="btn" href="/">Back home</a>
          <a class="btn btn-ghost" href="/contact">Send another</a>
        </div>
      </main>
    `,
      "Thank you"
    );
  });
});

module.exports = contactPostRouter;
