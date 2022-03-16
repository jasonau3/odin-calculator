const updateDisplay = (numbers) => {
    const display = document.querySelector('.display');
    display.textContent = display.textContent + numbers
}

const operate = (a, b, operator) => {
    if (operator === "+") {
        add(a,b)
    } else if (operator === "-") {
        subtract(a,b)
    } else if (operator === "*") {
        multiply(a,b)
    } else if (operator === "/") {
        divide(a,b)
    }
}

const add = (a,b) => {
	return a+b;
};

const subtract = (a,b) => {
	return a-b;
};

const multiply = (a,b) => {
	return a*b;
};

const divide = (a,b) => {
	return a/b;
};

const numberBtn = document.querySelectorAll(['[data-number]'])

numberBtn.forEach(btn => btn.addEventListener("click", () => {
    updateDisplay(btn.textContent)
}))