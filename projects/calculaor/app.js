// first Node js server
const http = require("http");
const layout = require("./src/layout");
const homePageContent  = require("./src/components/home")
const calculator = require("./src/components/calculator")
const calculateResult = require("./src/components/calculate-result")

const port = 3000;
let page = "Home";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    layout(res, homePageContent(), "Home");
    res.end();
  } else if (req.url === "/calculator") {
    layout(res, calculator(), "Calculator");
    res.end();
  } else if (req.url === "/calculate-result") {
    calculateResult(req, res);
  }
});

server.listen(port, () => {
  console.log(`server is running on port http//localhost:${port}`);
});

