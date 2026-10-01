const http = require("http");
const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(req.url);

  res.setHeader("Content-Type", "text/html");
  res.write('<html lang="en">');
  if (req.url == '/') {
      res.write(
    '<head> <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><h1>home </h1><p>This response for home page</p><a href="/about"><button>Go About </button></a></body>',
  );

  } else if(req.url == '/about') {
      res.write(
    '<head> <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><h1>About </h1><p>This is about</p><a href="/"><button> Go Home </button></a></body>',
  );
  }

  res.write("</html>");
  res.end();
});

server.listen(PORT, () => {
  console.log(`server running on address http://127.0.0.1:${PORT}`);
});
