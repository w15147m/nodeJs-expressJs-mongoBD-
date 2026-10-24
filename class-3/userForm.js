// first Node js server
const fs = require("fs");
const pages = ["/", "/about", "/contact", "/projects"];

const layout = require('./src/layout')
const reqHandler = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  let bodyContent = "";
  if (req.url === "/") {
    bodyContent = homePageContent(res, "Home", req);
  } else if (req.url === "/about") {
    bodyContent = pageContent(res, "About", req);
  } else if (req.url === "/contact") {
    bodyContent = pageContent(res, "Contact", req);
  } else if (req.url === "/projects") {
    bodyContent = pageContent(res, "project", req);
  } else if (req.url === "/submit-form") {
    bodyContent = submitFormContent(res, "submit-form", req);
  } else {
    bodyContent = "<h1>404 Not Found</h1>";
  }

  // 2. Pass the generated body content into the HTML wrapper
  layout(res, bodyContent);
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
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  req.on("end", () => {
    const bufferData = Buffer.concat(body).toString();
    const searchParams = new URLSearchParams(bufferData);
    data = Object.fromEntries(searchParams);
    // for (const [key, val] of searchParams.entries()){
    //   data[key] = val;
    // }
    console.log(data);
    fs.appendFileSync("users.txt", JSON.stringify(data) + "\n");
  });
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



module.exports = reqHandler;
