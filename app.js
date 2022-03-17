let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
const precision = 1000000;

const curDisplay = document.querySelector(".currentDisplay");
const prevDisplay = document.querySelector(".prevDisplay");
const numberBtn = document.querySelectorAll(["[data-number]"]);
const operatorBtn = document.querySelectorAll(["[data-operator]"]);
const equalsBtn = document.querySelector("#equals-btn");
const clearBtn = document.querySelector("#clear-btn");
const decimalBtn = document.querySelector("#decimal-btn");

numberBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    curDisplay.textContent += btn.textContent;
  })
);

operatorBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    doOperation(btn.textContent);
  })
);

clearBtn.addEventListener("click", () => {
  prevDisplay.textContent = "";
  curDisplay.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperand = null;
  decimalBtn.disabled = false;
});

decimalBtn.addEventListener("click", () => {
  // if its something like ".5", change it to "0.5"
  if (curDisplay.textContent === "") {
    curDisplay.textContent += "0";
  }
  if (curDisplay.textContent.includes(".")) {
    return;
  }
  curDisplay.textContent += ".";
});

equalsBtn.addEventListener("click", () => {
  evaluate();
});

const doOperation = (operator) => {
  if (currentOperation !== null) {
    evaluate();
  }
  firstOperand = curDisplay.textContent;
  currentOperation = operator;
  prevDisplay.textContent = `${firstOperand} ${currentOperation}`;
  curDisplay.textContent = "";
};

// TODO: bug where if i do 9÷÷, it goes through
const evaluate = () => {
  if (currentOperation === null) return; // prevent from doing "6=" (if no operator, skip)
  if (curDisplay.textContent === "0" && currentOperation === "÷") {
    alert('Stop in the name of "Dividing by Zero"');
    return;
  }
  secondOperand = curDisplay.textContent;
  curDisplay.textContent =
    Math.round(
      operate(firstOperand, secondOperand, currentOperation) * precision
    ) / precision;
  prevDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
};

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const operate = (a, b, operator) => {
  a = Number(a);
  b = Number(b);

  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "×") {
    return multiply(a, b);
  } else if (operator === "÷") {
    return divide(a, b);
  }
};
