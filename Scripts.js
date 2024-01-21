let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let resetScreen = false;

const display = document.querySelector("#display");
const numButtons = document.querySelectorAll(".numButton");
const opButtons = document.querySelectorAll(".opButton");
const eqButton = document.querySelector(".eqButton");
const clearButton = document.querySelector(".clearButton");
const backspaceButton = document.querySelector(".backspaceButton");
const percentageButton = document.querySelector(".percentageButton");
const doubleZeroButton = document.querySelector(".doubleZeroButton");
const squareRootButton = document.querySelector(".squareRootButton");
const squareButton = document.querySelector(".squareButton");

numButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

opButtons.forEach(button => {
    button.addEventListener('click', () => setOperation(button.textContent));
});

eqButton.addEventListener('click', () => compute());
clearButton.addEventListener('click', () => clear());
backspaceButton.addEventListener('click', () => backspace());
percentageButton.addEventListener('click', () => percentage());
doubleZeroButton.addEventListener('click', () => appendNumber('00'));
squareRootButton.addEventListener('click', () => squareRoot());
squareButton.addEventListener('click', () => square());

function appendNumber(num) {
    if (resetScreen) {
        display.style.opacity = '0';
        setTimeout(() => {
            display.textContent = "";
            resetScreen = false;
            display.style.opacity = '1';
        }, 200);
    }
    
    // If the current content is "0", replace it with the entered number
    if (display.textContent === "0") {
        display.textContent = num;
    } else {
        display.textContent += num;
    }
}

function setOperation(op) {
    if (currentOperator !== null) compute();
    firstOperand = display.textContent;
    currentOperator = op;
    resetScreen = true;
}

function compute() {
    secondOperand = display.textContent;
    display.textContent = operate(currentOperator, firstOperand, secondOperand);
    currentOperator = null;
}

function clear() {
    display.style.opacity = '0';
    setTimeout(() => {
        display.textContent = "0";
        firstOperand = "";
        secondOperand = "";
        currentOperator = null;
        display.style.opacity = '1';
    }, 200);
}

function backspace() {
    display.textContent = display.textContent.slice(0, -1);
}

function percentage() {
    display.textContent = String(Number(display.textContent) / 100);
}

function squareRoot() {
    display.textContent = Math.sqrt(Number(display.textContent));
}

function square() {
    display.textContent = Math.pow(Number(display.textContent), 2);
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':
            return (a * b).toString();
        case '/':
            if (b === 0) return 'Error! Div by 0';
            return (a / b).toString();
        default:
            return b;
    }
}
