const express = require("express");

const aboutRouter = express.Router();

const nav = require('../src/components/nav');
const layout = require("../src/layout");

aboutRouter.get('/about', (req, res) => {
  layout(res, `
    ${nav}
    <main class="card">
      <h1>About</h1>
      <p class="subtitle">A minimal Express setup</p>
      <div class="content">
        <p>This is a simple Node.js + Express server.</p>
      </div>
    </main>
  `, 'About');
});


module.exports = aboutRouter;
