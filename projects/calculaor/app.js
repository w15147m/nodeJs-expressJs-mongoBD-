// first Node js server
const http = require("http");
const layout = require("./src/layout");

const port = 3000;
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  let bodyContent = "";
  if (req.url === "/") {
    bodyContent = homePageContent(res, "Home", req);
  }
  layout(res, bodyContent);
  res.end();
});
server.listen(port, () => {
  console.log(`server is running on port http//localhost:${port}`);
});

const pages = ["/", "/about", "/contact", "/projects"];
const homePageContent = (page) => {
  return `
    <div class="card">
      <h1>Node Serve</h1>
      <p class="subtitle">This is <strong>${page}</strong></p>
      <div class="content">
        <form action="/submit-form" method="POST">
          <label for="name">Name</label>
          <input type="text" placeholder="Enter Name" id="name" name="name">
          <label for="email">Email</label>
          <input type="email" placeholder="Enter email" id="email" name="email">
          <label>Gender</label>
          <div class="radio-group">
            <input type="radio" id="male" name="gender" value="male">
            <label for="male">Male</label>
            <input type="radio" id="female" name="gender" value="female">
            <label for="female">Female</label>
          </div>
          <input type="submit" value="Submit">
        </form>
        <a href="/" class="nav-link">Go to "Home"</a>
      </div>
    </div>
  `;
};
