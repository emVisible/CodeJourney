function solution(nums:number[]):number[][]{
  nums.sort((a,b)=>a-b)
  const res:number[][] = []
  const n = nums.length
  for (let prev = 0; prev < n; prev++) {
    if (prev > 0 && nums[prev] == nums[prev - 1]) continue
    let fast = n - 1
    const target = -nums[prev]
    for (let slow = prev + 1; slow < n; slow++) {
      if (slow > prev + 1 && nums[slow] == nums[slow-1]) continue
      while (slow < fast && nums[slow] + nums[fast] > target) fast--
      if (slow == fast) break
      if (nums[slow] + nums[fast] == target) {
        res.push([nums[prev], nums[slow], nums[fast]])
      }
    }
  }
  return res
}

const res = solution([-1,0,1,2,-1,-4])
console.log('res',res)
