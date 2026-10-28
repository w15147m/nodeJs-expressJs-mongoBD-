// first Node js server
const express = require('express')
const port = 3000;


const app = express();

app.use((req, res, next) =>{
  console.log('====================================');
  console.log('This is first middleware');
  console.log('====================================');
  next();
})

app.use((req, res, next) =>{
  console.log('====================================');
  console.log('This is 2nd middleware');
  console.log('====================================');
  res.send('<p> Welcome to Express</p>')
})




app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
