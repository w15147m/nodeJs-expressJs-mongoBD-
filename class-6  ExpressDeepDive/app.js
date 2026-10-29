// first Node js server
const express = require('express');
const fs = require('fs');
const path = require('path');

const port = 3000;
const app = express();

// parse form data (for the contact form)
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('====================================');
  console.log('This is first middleware');
  console.log('====================================');
  next();
});

app.use((req, res, next) => {
  console.log('====================================');
  console.log('This is 2nd middleware');
  console.log('====================================');
  next(); // pass control on to the routes below
});

// simple nav shown on every page
const nav = `
  <nav>
    <a href="/">Home</a> |
    <a href="/about">About</a> |
    <a href="/projects">Projects</a> |
    <a href="/contact">Contact</a>
  </nav>
  <hr>
`;

// Home
app.get('/', (req, res) => {
  res.send(`${nav}<h1>Welcome to Express</h1><p>This is the home page.</p>`);
});

// About
app.get('/about', (req, res) => {
  res.send(`${nav}<h1>About</h1><p>This is a simple Node.js + Express server.</p>`);
});

// Projects
app.get('/projects', (req, res) => {
  res.send(`
    ${nav}
    <h1>Projects</h1>
    <ul>
      <li>Project One</li>
      <li>Project Two</li>
      <li>Project Three</li>
    </ul>
  `);
});

// Contact - show form
app.get('/contact', (req, res) => {
  res.send(`
    ${nav}
    <h1>Contact</h1>
    <form method="POST" action="/contact">
      <p><input type="text" name="name" placeholder="Your name" required></p>
      <p><textarea name="message" placeholder="Your message" rows="5" cols="40" required></textarea></p>
      <button type="submit">Send</button>
    </form>
  `);
});

// Contact - save message to sms.txt
app.post('/contact', (req, res) => {
  const { name, message } = req.body;
  const entry = `[${new Date().toLocaleString()}] ${name}: ${message}\n`;

  fs.appendFile(path.join(__dirname, 'sms.txt'), entry, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(`${nav}<p>Could not save your message.</p>`);
    }
    res.send(`${nav}<h1>Thank you!</h1><p>Your message has been saved.</p>`);
  });
});

// 404
app.use((req, res) => {
  res.status(404).send(`${nav}<h1>404</h1><p>Page not found.</p>`);
});

app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});