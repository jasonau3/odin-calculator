class Calculator {
  constructor(previousDisplayField, currentDisplayField, precision) {
    this.previousDisplayField = previousDisplayField;
    this.currentDisplayField = currentDisplayField;
    this.precision = precision;
    this.clear();
  }

  clear() {
    this.previousResult = this.currentOperand; // save result
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(num) {
    if (num === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + num.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.operate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    return a / b;
  }

  operate() {
    if (this.operation == null) return;
    if (this.currentOperand == "0" && this.operation === "÷") {
      alert("DONT DIVIDE BY 0. DONT!!!!!!!11!");
      this.clear();
      return;
    }

    let result;
    const a = Number(this.previousOperand);
    const b = Number(this.currentOperand);

    if (this.operation === "+") {
      result = this.add(a, b);
    } else if (this.operation === "-") {
      result = this.subtract(a, b);
    } else if (this.operation === "×") {
      result = this.multiply(a, b);
    } else if (this.operation === "÷") {
      result = this.divide(a, b);
    }

    // Round the result out
    result = Math.round(result * this.precision) / this.precision;

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.currentDisplayField.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousDisplayField.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousDisplayField.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const scientificButton = document.querySelector("[data-scientific]");
const previousAnsButton = document.querySelector("[data-previous-ans]");
const previousDisplayField = document.querySelector("[data-previous-calc]");
const currentDisplayField = document.querySelector("[data-current-calc]");

const calculator = new Calculator(
  previousDisplayField,
  currentDisplayField,
  (precision = 1000000000)
);

numberButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", () => {
  calculator.operate();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

previousAnsButton.addEventListener("click", () => {
  if (calculator.previousResult !== "undefined") {
    console.log(calculator.previousResult);
    calculator.currentOperand = calculator.previousResult;
    calculator.updateDisplay();
  }
});

scientificButton.addEventListener("click", () => {
  alert("NOT IMPLEMENTED");
});

// Preload stuff
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

window.addEventListener("load", () => {
  const preload = document.querySelector(".preload");
  // Stop for 2 seconds, then add class
  sleep(2000).then(() => {
    preload.classList.add("preload-finish");
  });
});

// TODO: ADD KEYBOARD SUPPORT + ×10^?
