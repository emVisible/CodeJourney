function isValid(s:string) {
  const map = new Map([
    [')', '('],
    [']', '['],
    ['}', '{']
  ])
  const stack = []
  for (const v of s) {
    if (map.has(v)) {
      if (!stack.length || stack[stack.length - 1] !== map.get(v)) return false
      stack.pop()
    }
    else {
      stack.push(v)
    }
  }
  return !stack.length
};
const res = isValid("()")
const res2 = isValid("()[]{}")
const res3 = isValid("(]")
const res4 = isValid("([)]")
console.log('res', res)
console.log('res2', res2)
console.log('res3', res3)
console.log('res4', res4)