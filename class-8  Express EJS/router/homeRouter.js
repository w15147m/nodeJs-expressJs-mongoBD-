const express = require("express");

const homeRouter = express.Router();

const nav = require('../components/nav');
const layout = require("../layout");

homeRouter.get("/", (req, res) => {
  layout(
    res,
    `
    ${nav}
    <main class="card">
      <h1>Welcome to Express</h1>
      <p class="subtitle">This is the <strong>home</strong> page.</p>
      <div class="content">
        <p>A small Node.js + Express server that handles routing, middleware and form data.</p>
      </div>
      <div class="actions">
        <a class="btn btn-ghost" href="/contact">Get in touch</a>
      </div>
    </main>
  `,
    "Home",
  );
});


module.exports = homeRouter;
