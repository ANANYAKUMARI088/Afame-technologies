let display = document.getElementById('display');
let currentInput = '';
let currentOperator = null;
let previousInput = '';
let shouldResetDisplay = false;

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

function chooseOperation(operator) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        compute();
    }
    currentOperator = operator;
    previousInput = currentInput;
    currentInput = '';
    shouldResetDisplay = true;
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperator = null;
    updateDisplay();
}

function deleteNumber() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function compute() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (currentOperator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }

    currentInput = computation.toString();
    currentOperator = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}
