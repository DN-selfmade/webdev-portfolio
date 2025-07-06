"use strict"

const keys = document.querySelectorAll(".key");
const display = document.querySelector(".display");
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operands = ["/", "*", "-", "+", ":", "x"];
const actions = ["Enter", "Backspace"];


let firstOperand;
let secondOperand;
let operand;
let sum;

keys.forEach((key) => {
    const type = key.getAttribute("data-type");
    const value = key.getAttribute("data-value");
    const text = key.textContent;
    key.addEventListener("click", () => {
        switch (type) {
            case "number": 
                display.textContent += value;
                break;
            
            case "operator":
                firstOperand = display.textContent;
                display.textContent = "";
                operand = text;
                break;

            case "action":
                if (text === "=") {
                    firstOperand = Number(firstOperand);
                    secondOperand = Number(display.textContent)
                    switch (operand) {
                        case "+":
                            sum = firstOperand + secondOperand;
                            display.textContent = sum;
                            break;

                        case "-":
                            sum = firstOperand - secondOperand;
                            display.textContent = sum;
                            break;

                        case "x":
                            sum = firstOperand * secondOperand;
                            display.textContent = sum;
                            break;

                        case "*":
                            sum = firstOperand * secondOperand;
                            display.textContent = sum;
                            break;
                    
                        default:
                            sum = firstOperand / secondOperand;
                            display.textContent = sum;
                            break;
                    } 
                } else if (text === "C") {
                    firstOperand = null;
                    secondOperand = null;
                    operand = null;
                    display.textContent = "";
                }
                break;

            default:
                break;
        }

    })
})

document.addEventListener("keydown", (event) => {
    const key = event.key
    console.log(key);
    if (numbers.includes(key)) {
        display.textContent += key;
    } else if (operands.includes(key)) {
        firstOperand = display.textContent;
        display.textContent = "";
        operand = key;
    } else if (actions.includes(key)) {
        if (key === "Enter") {
            firstOperand = Number(firstOperand);
            secondOperand = Number(display.textContent)
            if (operand === "+") {
                sum = firstOperand + secondOperand;
                display.textContent = sum;
            } else if (operand === "-") {
                sum = firstOperand - secondOperand;
                display.textContent = sum;
            } else if (operand === ":" || operand === "/") {
                sum = firstOperand / secondOperand;
                display.textContent = sum;
            } else if (operand === "x" || operand === "*") {
                sum = firstOperand * secondOperand;
                display.textContent = sum;
            }
        } else if (key === "Backspace") {
            firstOperand = null;
            secondOperand = null;
            operand = null;
            display.textContent = "";
        }
    }
})