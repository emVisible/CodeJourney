function solution(s: string): boolean {
  const tmp = [...s.toLowerCase()].join("").trim()
  const reverse = [...tmp].reverse().join("").trim()
  if (tmp == reverse){
    return true
  }
  return false
}

const res = solution("A man, a plan, a canal: Panama")
console.log('res',res)