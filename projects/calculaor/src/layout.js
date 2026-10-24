const fs = require("fs");
const path = require("path");
const css = fs.readFileSync(path.join(__dirname, "styles.css"), "utf8");

const layout = (res, content) => {
  res.write(`<!DOCTYPE html>
<html lang="en">
<head> 
  <meta charset="UTF-8" /> 
  <meta name="viewport" content="width=device-width, initial-scale=1" /> 
  <title>Node serve</title> 
  <style> 
    ${css} 
  </style> 
</head>
<body>
  <div class="card">
       <h1>Calculator</h1>
       <br/>
       <div class="content">
       ${content}
    </div>
    </div>
</body>
</html>`);
};

module.exports = layout;
