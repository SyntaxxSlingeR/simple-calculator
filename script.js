const display = document.getElementById('display');
let errorState = false;

function appendValue(value) {
  if (errorState) {
    display.value = '';
    errorState = false;
  }
  
  const operators = ['+', '-', '*', '/'];
  const lastChar = display.value.slice(-1);
  if (operators.includes(value) && operators.includes(lastChar)) {
    display.value = display.value.slice(0, -1) + value;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = '';
  errorState = false;
}

function calculateResult() {
  try {
    const expression = display.value.trim();
    if (!expression) return;

    if (/[^-()\d/*+.]/.test(expression)) {
      throw new Error('Invalid characters');
    }

    const result = new Function('return ' + expression)();
    display.value = result;
  } catch (e) {
    display.value = 'Error';
    errorState = true;
  }
}

document.addEventListener('keydown', (e) => {
  const allowedKeys = ['0','1','2','3','4','5','6','7','8','9', '+', '-', '*', '/', '.', '(', ')'];
  if (allowedKeys.includes(e.key)) {
    e.preventDefault();
    appendValue(e.key);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    calculateResult();
  } else if (e.key === 'Backspace') {
    e.preventDefault();
    if (errorState) {
      clearDisplay();
    } else {
      display.value = display.value.slice(0, -1);
    }
  } else if (e.key === 'Escape') {
    e.preventDefault();
    clearDisplay();
  }
});


