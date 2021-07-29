const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const pointButton = document.querySelector("[data-point]");
const screen = document.querySelector("[data-screen]")

let shouldResetScreen = false;
let firstOperand = "";
let secondOperand = "";
let currentOperator = null;

window.addEventListener("keydown", setInput);
deleteButton.addEventListener("click", deleteNumber);
clearButton.addEventListener("click", clear);
equalsButton.addEventListener("click", checkOperation);
pointButton.addEventListener("click", addPoint);

numberButtons.forEach((button) => button.addEventListener("click", () => addNumber(button.textContent)));

operatorButtons.forEach((button) => button.addEventListener('click', () => addOperation(button.textContent)));

function addNumber(number) {
    if (screen.textContent === "0" || shouldResetScreen) {
        resetScreen();
    }
    screen.textContent += number;
}

function resetScreen() {
    screen.textContent = "";
    shouldResetScreen = false;
}

function addOperation(operator) {
    if (currentOperator !== null) {
        checkOperation();
    }
    firstOperand = screen.textContent;
    currentOperator = operator;
    shouldResetScreen = true;
}

function checkOperation() {
    if (currentOperator === null || shouldResetScreen) {
        return;
    }
    if (currentOperator === "÷" && screen.textContent === "0") {
        alert("You can't divide by 0.");
        clear();
        return;
    }

    secondOperand = screen.textContent;
    screen.textContent = roundResult(operate(currentOperator, firstOperand, secondOperand));
    currentOperator = null;
}

function operate(operator, n1, n2) {
    n1 = Number(n1);
    n2 = Number(n2);

    switch(operator) {
        case "÷":
            if (n2 === 0) {
                return null;
            } else {
                return n1 / n2;
            }
        case "×":
            return n1 * n2;
        case "−":
            return n1 - n2;
        case "+":
            return n1 + n2;
    }
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function setInput(e) {
    if (e.key >= 0 && e.key <= 9) {
        addNumber(e.key);
    }
    if (e.key === ".") { 
        addPoint();
    } 
    if (e.key === "=" || e.key === "Enter") {
        checkOperation();
    }
    if (e.key === "Backspace") {
        deleteNumber();
    }
    if (e.key === "Escape") {
        clear();
    }
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        addOperation(convertOperator(e.key));
    } 
  }
  
function convertOperator(keyboardOperator) {
    switch(keyboardOperator) {
        case "/":
            return "÷"; 
        case "*":
            return "×";
        case "-":
            return "−"
        case "+":
            return "+";
    }
}

function addPoint() {
    if (shouldResetScreen) {
        resetScreen();
    }

    if (screen.textContent === "") {
        screen.textContent = "0";
    }

    if (screen.textContent.includes(".")) {
        return;
    }

    screen.textContent += ".";
}

function clear() {
    screen.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
}

function deleteNumber() {
    screen.textContent = screen.textContent.toString().slice(0, -1);
}