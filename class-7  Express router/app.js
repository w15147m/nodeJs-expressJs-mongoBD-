// first Node js server
const express = require('express');
const port = 3000;
const app = express();
const homeRouter = require('./src/router/homeRouter')
const aboutRouter = require('./src/router/aboutRouter')
const contactRouter = require('./src/router/contactRouter')
const contactPostRouter = require('./src/router/contactPostRouter')
const notFoundRouter = require('./src/router/notFoundRouter')





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