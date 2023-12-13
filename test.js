//Task 1. There is a monkey which can walk around on a planar grid. The monkey can move one space at a time left, right, up or down. That is, from (x, y) the monkey can go to (x+1, y), (x-1, y), (x, y+1), and (x, y-1).
// Points where the sum of the digits of the absolute value of the x coordinate plus the sum of the digits of the absolute value of the y coordinate are lesser than or equal to 19 are accessible to the monkey. For example, the point (59, 79) is inaccessible because 5 + 9 + 7 + 9 = 30, which is greater than 19. Another example: the point (-5, -7) is accessible because abs(-5) + abs(-7) = 5 + 7 = 12, which is less than 19. How many points can the monkey access if it starts at (0, 0), including (0, 0) itself?

// Path: test.js
// Monkey on a Planar Grid
function isAccessible(x, y) {
    const sumDigits = num => num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    return sumDigits(Math.abs(x)) + sumDigits(Math.abs(y)) <= 19;
}

function countAccessiblePoints() {
    let accessiblePoints = 0;
    for (let x = -19; x <= 19; x++) {
        for (let y = -19; y <= 19; y++) {
            if (isAccessible(x, y)) {
                accessiblePoints++;
            }
        }
    }
    return accessiblePoints;
}

const resultTask1 = countAccessiblePoints();
console.log(resultTask1);



//Task 2. Implement aa siomple calculator that could accept only integers and perform calculation including: +, -, /,*, () and follow priority of operations.

// Path: test.js
// Calculator
function calculator(expression) {
    const operators = ['+', '-', '*', '/'];
    const priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };
    const stack = [];
    const output = [];
    let number = '';
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        if (operators.includes(char)) {
            if (number) {
                output.push(number);
                number = '';
            }
            while (stack.length && priority[stack[stack.length - 1]] >= priority[char]) {
                output.push(stack.pop());
            }
            stack.push(char);
        } else if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            if (number) {
                output.push(number);
                number = '';
            }
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop();
        } else {
            number += char;
        }
    }
    if (number) {
        output.push(number);
    }
    while (stack.length) {
        output.push(stack.pop());
    }
    const result = [];
    for (let i = 0; i < output.length; i++) {
        const char = output[i];
        if (operators.includes(char)) {
            const b = result.pop();
            const a = result.pop();
            result.push(eval(`${a}${char}${b}`));
        } else {
            result.push(char);
        }
    }
    return result[0];
}
