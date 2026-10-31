// first Node js server
const express = require('express');
const fs = require('fs');
const path = require('path');
const layout = require('./src/layout');

const bodyParser = require('body-parser'); 
const port = 3000;
const app = express();
const nav = require('./src/components/nav')
const homeRouter =  require('./src/router/homeRouter')
const aboutRouter =  require('./src/router/aboutRouter')
const contactRouter =  require('./src/router/contactRouter')
const notFoundRouter =  require('./src/router/notFoundRouter')





// Home

app.use(homeRouter);

// About
app.use(aboutRouter);

// parse form data (for the contact form)
app.use(express.urlencoded({ extended: true }));
app.use(contactRouter);









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

app.use(notFoundRouter);


app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});