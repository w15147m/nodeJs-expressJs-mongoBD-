// first Node js server
const fs = require("fs")
const pages = ["/", "/about", "/contact", "/projects"];

 const reqHandler = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  htmlHead(res);

  if (req.url == "/") {
    homePageContent(res, "Home", req);
  } else if (req.url == "/about") {
    pageContent(res, "About", req);
  } else if (req.url == "/contact") {
    pageContent(res, "Contact", req);
  } else if (req.url == "/projects") {
    pageContent(res, "project", req);
  }else if (req.url == "/submit-form") {
    submitFormContent(res, "submit-form", req);
  }
  res.write(`
         </div>
       </div>
     </body>
   `);
  res.write("</html>");
  res.end();
};


const homePageContent = (res, page, req) => {
  const url = req.url;
  res.write(`
     <body>
       <div class="card">
         <h1>Node Serve</h1>
         <p class="subtitle">This is <strong>${page}</strong></p>
         <div class="content">
   `);
  res.write(`
  <form action="/submit-form" method="POST">
    <label for="name">Name</label>
    <input type="text" placeholder="Enter Name" id="name" name="name">
    <label for="email">Email</label>
    <input type="email" placeholder="Enter email" id="email" name="email">
    <label>Gender</label>
    <div class="radio-group">
      <input type="radio" id="male" name="gander" value="male">
      <label for="male">Male</label>
      <input type="radio" id="female" name="gander" value="female">
      <label for="female">Female</label>
    </div>
    <input type="submit" value="Submit">
  </form>
`);

  pages.forEach((element) => {
    if (url !== element) {
      res.write(`
          <a href="${element}" class="nav-link">
            Go to ${element === "/" ? "Home" : element.replace("/", "")}
          </a>
        `);
    }
  });
};


const submitFormContent = (res, page, req) => {
  const url = req.url;
  const body = [];
  var data = {};
  req.on('data', (chunk) =>{
    body.push(chunk);
  });
  req.on('end', () =>{
    const  bufferData  = Buffer.concat(body).toString();
    const searchParams = new URLSearchParams(bufferData) ;
    data = Object.fromEntries(searchParams)
    // for (const [key, val] of searchParams.entries()){
    //   data[key] = val;
    // }
    console.log(data);
    fs.appendFileSync("users.txt", JSON.stringify(data) + "\n");
  })
  res.write(`
     <body>
       <div class="card">
         <h1>Node Serve</h1>
         <p class="subtitle">This is <strong>${page}</strong></p>
         <div class="content">
   `);
  pages.forEach((element) => {
    if (url !== element) {
      res.write(`
          <a href="${element}" class="nav-link">
            Go to ${element === "/" ? "Home" : element.replace("/", "")}
          </a>
        `);
    }
  });
};















const pageContent = (res, page, req) => {
  const url = req.url;
  res.write(`
     <body>
       <div class="card">
         <h1>Node Serve</h1>
         <p class="subtitle">This is <strong>${page}</strong></p>
         <div class="content">
   `);
  pages.forEach((element) => {
    if (url !== element) {
      res.write(`
          <a href="${element}" class="nav-link">
            Go to ${element === "/" ? "Home" : element.replace("/", "")}
          </a>
        `);
    }
  });
};

const htmlHead = (res) => {
  res.write(`
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <title>Node serve</title>
       <style>
         * { box-sizing: border-box; }

         body {
           margin: 0;
           min-height: 100vh;
           display: flex;
           justify-content: center;
           align-items: center;
           padding: 20px;
           font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
           background: linear-gradient(135deg, #e0e7ff 0%, #f4f4f7 50%, #dbeafe 100%);
           color: #1e293b;
         }

         .card {
           background: #ffffff;
           padding: 36px 32px;
           border-radius: 18px;
           box-shadow: 0 10px 40px rgba(30, 41, 59, 0.12);
           text-align: center;
           max-width: 420px;
           width: 100%;
           border-top: 5px solid #3b82f6;
         }

         .card h1 {
           margin: 0 0 8px;
           font-size: 1.9rem;
           letter-spacing: -0.5px;
           color: #1e293b;
         }

         .subtitle {
           color: #64748b;
           font-size: 1.05rem;
           margin: 0 0 28px;
         }

         .subtitle strong {
           color: #3b82f6;
           background: #eff6ff;
           padding: 2px 10px;
           border-radius: 999px;
         }

         .content {
           display: flex;
           flex-direction: column;
           gap: 12px;
         }

         form {
           display: flex;
           flex-direction: column;
           gap: 8px;
           text-align: left;
           margin-bottom: 12px;
           padding: 20px;
           background: #f8fafc;
           border: 1px solid #e2e8f0;
           border-radius: 12px;
         }

         form label {
           font-size: 0.85rem;
           font-weight: 600;
           color: #475569;
         }

         form input[type="text"],
         form input[type="email"] {
           width: 100%;
           padding: 10px 12px;
           margin-bottom: 6px;
           border: 1px solid #cbd5e1;
           border-radius: 8px;
           font-size: 0.95rem;
           background: #ffffff;
           color: #1e293b;
           outline: none;
           transition: border-color 0.2s, box-shadow 0.2s;
         }

         form input[type="text"]:focus,
         form input[type="email"]:focus {
           border-color: #3b82f6;
           box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
         }

         .radio-group {
           display: flex;
           align-items: center;
           gap: 8px;
           margin-bottom: 8px;
         }

         .radio-group label {
           font-weight: 500;
           margin-right: 10px;
         }

         .radio-group input[type="radio"] {
           accent-color: #3b82f6;
           width: 16px;
           height: 16px;
           margin: 0;
         }

         form input[type="submit"] {
           padding: 11px;
           background-color: #1e293b;
           color: #ffffff;
           border: none;
           border-radius: 8px;
           font-size: 1rem;
           font-weight: 600;
           cursor: pointer;
           transition: background 0.2s, transform 0.1s;
         }

         form input[type="submit"]:hover { background-color: #0f172a; }
         form input[type="submit"]:active { transform: scale(0.98); }

         .nav-link {
           display: block;
           padding: 11px;
           background-color: #3b82f6;
           color: white;
           text-decoration: none;
           border-radius: 8px;
           font-weight: 500;
           transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
         }

         .nav-link:hover {
           background-color: #2563eb;
           transform: translateY(-2px);
           box-shadow: 0 6px 14px rgba(59, 130, 246, 0.35);
         }
       </style>
     </head>
   `);
};



module.exports = reqHandler;