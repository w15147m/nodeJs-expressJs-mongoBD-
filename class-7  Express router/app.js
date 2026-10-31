// first Node js server
const express = require('express');
const fs = require('fs');
const path = require('path');
const layout = require('./src/layout');

const bodyParser = require('body-parser'); 
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
  <nav class="nav">
    <a class="nav-link" href="/">Home</a>
    <a class="nav-link" href="/about">About</a>
    <a class="nav-link" href="/projects">Projects</a>
    <a class="nav-link" href="/contact">Contact</a>
  </nav>
`;

// Home
app.get('/', (req, res) => {
  layout(res, `
    ${nav}
    <main class="card">
      <h1>Welcome to Express</h1>
      <p class="subtitle">This is the <strong>home</strong> page.</p>
      <div class="content">
        <p>A small Node.js + Express server that handles routing, middleware and form data.</p>
      </div>
      <div class="actions">
        <a class="btn" href="/projects">View projects</a>
        <a class="btn btn-ghost" href="/contact">Get in touch</a>
      </div>
    </main>
  `, 'Home');
});

// About
app.get('/about', (req, res) => {
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

// Projects
app.get('/projects', (req, res) => {
  layout(res, `
    ${nav}
    <main class="card">
      <h1>Projects</h1>
      <p class="subtitle">A few things in progress</p>
      <ul class="project-list">
        <li>Project One</li>
        <li>Project Two</li>
        <li>Project Three</li>
      </ul>
      <div class="actions">
        <a class="btn btn-ghost" href="/contact">Start a project</a>
      </div>
    </main>
  `, 'Projects');
});





// Contact - show form
app.get('/contact', (req, res) => {
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


// Contact - save message to sms.txt
app.post('/contact', (req, res) => {
  const { name, message } = req.body;
  const entry = `[${new Date().toLocaleString()}] ${name}: ${message}\n`;

  fs.appendFile(path.join(__dirname, 'sms.txt'), entry, (err) => {
    if (err) {
      console.error(err);
      res.status(500);
      return layout(res, `
        ${nav}
        <main class="card">
          <h1>Something went wrong</h1>
          <p class="subtitle">Could not save your message.</p>
          <div class="actions">
            <a class="btn" href="/contact">Try again</a>
          </div>
        </main>
      `, 'Error');
    }
    layout(res, `
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
    `, 'Thank you');
  });
});
// 404
app.use((req, res) => {
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

app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});