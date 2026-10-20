// first Node js server
const http = require("http");
const  port = 3000;
const server= http.createServer((req, res) => {
   res.setHeader('Content-Type', 'text/html');
   res.write('<html>');
   res.write('<head> <title>Node serve</title> </head>');
   res.write('<body> <h1>Node serve</h1> </body>');
   res.write('</html>');
   res.end();

});

server.listen(port, () => {
  console.log(`server is running on port http//localhost:${port}`);
});