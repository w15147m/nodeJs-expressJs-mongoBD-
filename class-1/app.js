// first Node js server
const http = require("http");
const  port = 3000;
const server= http.createServer((req, res) => {
  console.log(req);
});

server.listen(port, () => {
  console.log(`server is running on port http//localhost${port}`);
});