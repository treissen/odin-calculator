let equation = '' // going to be displaying what equation the user clicks
let currentInput = '' // what the user just clicked





// on button click assign value to current input and write to html
function calcClickHandler(value) {
    currentInput = value;
    document.getElementById('inputDisplay').innerHTML = value.toString();
}











const subtract = (a, b) => {
    return a - b;
}
const add = (a, b) => {
    return a + b;
}
const divide = (a, b) => {
    return a / b;
}
const multiply = (a, b) => {
    return a * b;
}


const operate = (opertor, a, b) => {
    
}