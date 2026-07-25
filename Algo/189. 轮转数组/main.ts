function solution(nums:number[], k:number){
  const res = Array.from(nums)
  for (let i = 0; i < k; i++ ){
    res.unshift(nums.pop()!)
    res.pop()
  }
  return res
}

const res = solution( [1,2,3,4,5,6,7], 3)
console.log(res)
