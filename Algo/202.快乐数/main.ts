  const getNext = (num:number)=>{
    let res = 0
    while (num > 0) {
      let tmp = num % 10
      num = num / 10
      res += tmp * tmp
    }
    return res
  }
  
function isHappy(n: number): boolean {

  const set = new Set()
  while (n != 1 && !set.has(n)) {
    set.add(n)
    n = getNext(n)
  }
  return n == 1
};

const res = isHappy(19)
const res2 = isHappy(2)
console.log('res', res)
console.log('res2', res2)