const calculator = () => {
  return ` 
   <form action="/calculate-result" method="POST">
  <label for="num1">First Number</label>
  <input type="number" placeholder="Enter first number" id="num1" name="num1" required step="any">

  <label for="num2">Second Number</label>
  <input type="number" placeholder="Enter second number" id="num2" name="num2" required step="any">

  <label for="operation">Operation</label>
  <select id="operation" name="operation" required>
    <option value="add">Addition (+)</option>
    <option value="subtract">Subtraction (-)</option>
    <option value="multiply">Multiplication (×)</option>
    <option value="divide">Division (÷)</option>
  </select>

  <input type="submit" value="Calculate">
</form>`;
};

module.exports  = calculator;
