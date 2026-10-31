const express = require("express");
const app = express();

const PORT = 3000;

app.use((req, res, next) => {
  console.log("Welcome to", req.url, req.method);
  next();
  
});

app.get("/", (req, res, next) => {
  res.send(' <h1>Welcome to airbnb</h1> <a href="/add-home">Add Home</a>');
});


app.get("/add-home", (req, res, next) => {
  res.send(`<h1>register your home:</h1> 
            <label for="home">Your home</label>
          <input id="home" type="text" name="home" placeholder="Jane Doe" required>`);
});

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
