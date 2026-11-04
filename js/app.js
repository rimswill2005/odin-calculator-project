/* 


const Calculator = {



    add : (n1,n2) => {
        return  n1 + n2
    },
    subtract : (n1,n2) => {

        return n1 - n2;
    },
    multiply : (n1,n2) => {
        return n1 * n2;
    },

    divide : (n1,n2) => {
        return n1 / n2;
    },

    operator : (operant,n1,n2) => {
        
        if(operant === '+') 
            return n1 + n2
        else if(operant === '-')
            return n1 - n2
        else if(operant === '*')
            return n1 * n2
        else if(operant === '/')
            return n1 * n2;
        else 
            return "incorrect operator"
    }

    
}


console.log(Calculator.operator('+',20,30))


 */


const display = document.querySelector("#display");

let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let currentInput = "";
let resultDisplayed = false;

function operate(a, operator, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? null : a / b;
    default:
      return null;
  }
}

function formatResult(number) {
  if (!Number.isFinite(number)) return String(number);
  return String(Number(number.toPrecision(10)));
}

function clearCalculator() {
  firstNumber = null;
  secondNumber = null;
  currentOperator = null;
  currentInput = "";
  resultDisplayed = false;
  display.value = "0";
}

function calculatePending() {
  const result = operate(firstNumber, currentOperator, secondNumber);

  if (result === null) {
    display.value = "Nice try! No dividing by zero.";
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    currentInput = "";
    resultDisplayed = true;
    return false;
  }

  display.value = formatResult(result);
  firstNumber = Number(display.value);
  secondNumber = null;
  currentInput = display.value;
  return true;
}

function enterDigit(digit) {
  if (resultDisplayed) {
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    currentInput = "";
    resultDisplayed = false;
  }

  currentInput += digit;
  display.value = currentInput;

  if (currentOperator === null) {
    firstNumber = Number(currentInput);
  } else {
    secondNumber = Number(currentInput);
  }
}

function chooseOperator(nextOperator) {
  if (firstNumber === null) return;

  // If there is a complete pair, calculate it before choosing the next operator.
  if (currentOperator !== null && secondNumber !== null) {
    if (!calculatePending()) return;
  }

  // If no second number has been entered, this replaces the previous operator.
  currentOperator = nextOperator;
  secondNumber = null;
  currentInput = "";
  resultDisplayed = false;
}

function pressEquals() {
  // Wait until a first number, operator, and second number are all entered.
  if (
    firstNumber === null ||
    currentOperator === null ||
    secondNumber === null
  ) {
    return;
  }

  if (calculatePending()) {
    currentOperator = null;
    resultDisplayed = true;
  }
}

document.querySelector(".buttons").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.number !== undefined) {
    enterDigit(button.dataset.number);
  } else if (button.dataset.operator) {
    chooseOperator(button.dataset.operator);
  } else if (button.dataset.action === "equals") {
    pressEquals();
  } else if (button.dataset.action === "clear") {
    clearCalculator();
  }
});