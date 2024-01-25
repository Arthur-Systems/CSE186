/*
#######################################################################
#
# Copyright (C) 2020-2024 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

/**
 * CSE186 Assignment 2
 *
 * Simple Reverse Polish Notation (RPN) Calculator supporting
 * addition, subtraction, multiplication, division and power
 */
class Rpnc {
  /**
     * Evaluate an RPN expression
     * @param {string} expression RPN expression
     * @return {number} result of evaluating expression
     * @throws Error if expression cannot be parsed
     */
  evaluate(expression) {
    const stack = [];
    const expressionList = expression.split(' ');
    expressionList.forEach((element) => {
      if (!isNaN(element)) {
        stack.push(parseFloat(element));
      } else {
        // USED THE PUDO CODE FROM THE ASSIGNMENT
        if (stack.length < 2) {
          throw new Error('Invalid Expression');
        } else if (element === '+') {
          const a = stack.pop();
          const b = stack.pop();
          stack.push(a + b);
        } else if (element === '-') {
          const a = stack.pop();
          const b = stack.pop();
          stack.push(b - a);
        }
        if (element === '*') {
          const a = stack.pop();
          const b = stack.pop();
          stack.push(a * b);
        }
        if (element === '/') {
          const a = stack.pop();
          const b = stack.pop();
          stack.push(b / a);
        }
        if (element === '^') {
          const a = stack.pop();
          const b = stack.pop();
          stack.push(b ** a);
        }
      }
    });
    if (stack.length > 1) {
      throw new Error('Invalid Expression');
    }
    return stack.pop();
  }
}

module.exports = Rpnc;
