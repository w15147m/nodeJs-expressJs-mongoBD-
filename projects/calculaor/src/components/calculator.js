const calculator = () => {
  return `
  <p class="subtitle"> <strong>Enter  numbers and click "=" </strong></p>

  <form action="/calculate-result" method="POST" class="calc-form-row">
    <input type="number" placeholder="First number" id="num1" name="num1" required step="any" class="calc-input">
    <select id="operation" name="operation" required class="calc-select" aria-label="Operation">
      <option value="add">+</option>
      <option value="subtract">−</option>
      <option value="multiply">×</option>
      <option value="divide">÷</option>
    </select>
    <input type="number" placeholder="Second number" id="num2" name="num2" required step="any" class="calc-input">
    <input type="submit" value="=" class="calc-submit-btn" title="Calculate">
  </form>`;
};

module.exports = calculator;
