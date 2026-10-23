// first Node js server
const http = require("http");
const  port = 3000;
const server= http.createServer((req, res) => {
    if(req.url == '/'){
      pageContent(res, 'Home', req.url)
    }else if(req.url == '/about'){
      pageContent(res, 'About', req.url)
    }
    else if(req.url == '/contact'){
      pageContent(res, 'Contact', req.url)
    }
     else if(req.url == '/projects'){
      pageContent(res, 'project', req.url)

    }
});
server.listen(port, () => {
  console.log(`server is running on port http//localhost:${port}`);
});

const pages = ['/' , '/about', '/contact', '/projects', ];
const pageContent = (res, page, url) => {
   res.setHeader('Content-Type', 'text/html');
   res.write('<html>');
   res.write(`
     <head> 
       <title>Node serve</title> 
     </head>
   `);
   res.write(`
     <body style="font-family: system-ui, sans-serif; background-color: #f4f4f7; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
       <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: center; max-width: 400px; width: 100%;">
         <h1 style="color: #1e293b; margin-top: 0;">Node Serve</h1> 
         <p style="color: #64748b; font-size: 1.1rem; margin-bottom: 24px;">This is <strong style="color: #3b82f6;">${page}</strong></p>
         <div style="display: flex; flex-direction: column; gap: 10px;">
   `);

   pages.forEach(element => {
     if (url !== element) {
        res.write(`
          <a href="${element}" style="display: block; padding: 10px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; transition: background 0.2s;">
            Go to ${element === '/' ? 'Home' : element.replace('/', '')}
          </a>
        `);
     }
   });

   res.write(`
         </div>
       </div>
     </body>
   `);
   res.write('</html>');
   res.end();
}

