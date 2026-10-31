const fs = require("fs");
const path = require("path");
const css = fs.readFileSync(path.join(__dirname, "styles.css"), "utf8");


const layout = (res, content, title = "Node Express") => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} · Node Express</title>
  <style>
${css}
  </style>
</head>
<body>
  ${content}
</body>
</html>`);
};

module.exports = layout;
