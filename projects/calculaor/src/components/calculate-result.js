const fs = require("fs");
const layout = require("../layout");

const calculateResult = (req, res) => {
  const body = [];

  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const bufferData = Buffer.concat(body).toString();
    const searchParams = new URLSearchParams(bufferData);
    const data = Object.fromEntries(searchParams);

    const num1 = Number(data.num1);
    const num2 = Number(data.num2);
    let resultValue = 0;
    let symbol = "";

    switch (data.operation) {
      case "add":
        resultValue = num1 + num2;
        symbol = "+";
        break;
      case "subtract":
        resultValue = num1 - num2;
        symbol = "−";
        break;
      case "multiply":
        resultValue = num1 * num2;
        symbol = "×";
        break;
      case "divide":
        resultValue = num2 !== 0 ? num1 / num2 : "Cannot divide by 0";
        symbol = "÷";
        break;
      default:
        resultValue = "Invalid operation";
    }

    const logData = {
      num1,
      operation: data.operation,
      num2,
      result: resultValue,
    };
    fs.appendFileSync("users.txt", JSON.stringify(logData) + "\n");

    const content = ` 
    <div>
      <p class="subtitle"> Your result is ... <br/><strong>
      ${num1} ${symbol} ${num2} = ${resultValue}
      </strong></p>
      <a href="/calculator" class="nav-link">Calculate Again</a>
    </div>
    `;

    layout(res, content, "Result");
    res.end();
  });
};
module.exports = calculateResult;
