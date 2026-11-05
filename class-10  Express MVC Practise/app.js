// first Node js server
const express = require("express");
const path = require("path");
const port = 3000;
const app = express();
const router = require("./src/routes/route");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
