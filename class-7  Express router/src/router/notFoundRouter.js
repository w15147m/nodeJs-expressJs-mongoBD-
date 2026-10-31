const express = require("express");

const notFoundRouter = express.Router();

const nav = require('../components/nav');
const layout = require("../layout");

notFoundRouter.use((req, res) => {
  res.status(404);
  layout(res, `
    ${nav}
    <main class="card">
      <p class="error-code">404</p>
      <h1>Page not found</h1>
      <p class="subtitle">The page you are looking for does not exist.</p>
      <div class="actions">
        <a class="btn" href="/">Back home</a>
      </div>
    </main>
  `, 'Not found');
});


module.exports = notFoundRouter;
