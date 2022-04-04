class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return // makes it so only one period can be displayed
        this.currentOperand = this.currentOperand.toString() + number.toString(); // adds to the display, instead of adding the numbers together
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return // checks if current operand is empty, if it is then it will not run code below
        if (this.previousOperand !== '') { // if previous is not empty then compute the arithmetic and return value on previous display
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand // when operand is clicked we are done with this number so it gets moved to display above.
        this.currentOperand = '';  // clears current display and allows us to put in new number.
    
    }

    compute() {
        let computation //result of compute function
        const prev = parseFloat(this.previousOperand) // converting string to number
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return // checks if user has clicked numbers, if not then code will not run
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                if(current == 0){
                    alert('cannot divide by zero')
                    return
                }
                computation = prev / current
                break
            default:
                return
        }
        // follwing code resets everything and displays compution after switch statment breaks
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        } 
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]') //data attributes must be in brackets
const operationButtons = document.querySelectorAll('[data-operation]') //data attributes must be in brackets
const equalsButton = document.querySelector('[data-equals]')
const ACButton = document.querySelector('[data-allClear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previousOperand]')
const currentOperandTextElement = document.querySelector('[data-currentOperand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement); //needs to be different things other wise you get a syntax error, const calculator and class Calculator, notice the upper and lower case

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', button => { //when we click equals it runs compute funciton
    calculator.compute();
    calculator.updateDisplay();
})
ACButton.addEventListener('click', button => { 
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', button => { 
    calculator.delete();
    calculator.updateDisplay();
})

// keyboard functionality

window.addEventListener('keydown', (event) =>{
    if (event.key >= 0 && event.key <= 9 || event.key === '.') {
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
    if (event.key === '+' || event.key === '-' || event.key === '/' || event.key === '*' ) {
        calculator.chooseOperation(event.key);
        calculator.updateDisplay();
    }
    

});

