// first Node js server
const express = require('express');
const path = require('path');
const port = 3000;
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Serve static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

const homeRouter = require('./src/routes/homeRouter')
const aboutRouter = require('./src/routes/aboutRouter')
const contactRouter = require('./src/routes/contactRouter')
const contactPostRouter = require('./src/routes/contactPostRouter')
const notFoundRouter = require('./src/routes/notFoundRouter')





// Home

app.use(homeRouter);

// About
app.use(aboutRouter);

// parse form data (for the contact form)
app.use(express.urlencoded({ extended: true }));
app.use(contactRouter);
app.use(contactPostRouter);

// 404
app.use(notFoundRouter);


app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});