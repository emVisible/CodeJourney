function evalRPN(tokens: string[]): number {
  const stack = [] as number[]
  const isNumber = (value: string) => {
    return !(value == '+' || value == '-' || value == '*' || value == '/')
  }
  for (const value of tokens) {
    if (isNumber(value)) {
      stack.push(Number(value))
    }
    else {
      const num2 = stack.pop()
      const num1 = stack.pop()
      switch (value) {
        case '*':
          stack.push(num1 * num2)
          break;
        case '/':
          stack.push(num1 / num2 > 0 ? Math.floor(num1 / num2) : Math.ceil(num1 / num2))
          break;
        case '+':
          stack.push(num1 + num2)
          break;
        case '-':
          stack.push(num1 - num2)
          break;
      }
    }
  }
  return stack.pop()
};

const res = evalRPN(["2", "1", "+", "3", "*"])
const res2 = evalRPN(["4", "13", "5", "/", "+"])
console.log('res', res)
console.log('res2', res2)
