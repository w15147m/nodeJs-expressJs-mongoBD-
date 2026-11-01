const express = require("express");

const contactRouter = express.Router();

const nav = require('../components/nav');
const layout = require("../layout");




contactRouter.get('/contact', (req, res) => {
  layout(res, `
    ${nav}
    <main class="card">
      <h1>Contact</h1>
      <p class="subtitle">Send me a message</p>
      <form method="POST" action="/contact">
        <div class="field">
          <label for="name">Your name</label>
          <input id="name" type="text" name="name" placeholder="Jane Doe" required>
        </div>
        <div class="field">
          <label for="message">Your message</label>
          <textarea id="message" name="message" placeholder="Write your message here..." rows="5" required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </main>
  `, 'Contact');
});



module.exports = contactRouter;
