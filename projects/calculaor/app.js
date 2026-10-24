// first Node js server
const http = require("http");
const layout = require("./src/layout");
const homePageContent  = require("./src/components/home")
const calculator = require("./src/components/calculator")
const port = 3000;
let page = "Home";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  let bodyContent = "";
  if (req.url === "/") {
    bodyContent = homePageContent();
    page = "Home";
  } else if (req.url === "/calculator"){
    bodyContent = calculator();

  }
  else if (req.url === "/calculate-result"){

  }
  layout(res, bodyContent, page);
  res.end();
});

server.listen(port, () => {
  console.log(`server is running on port http//localhost:${port}`);
});

