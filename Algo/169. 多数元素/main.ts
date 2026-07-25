/**
 * 暴力: 先排序再筛选
*/
function solution(nums: number[]): number {
  if (nums.length == 1) return nums[0]
  nums.sort((a, b) => a - b)
  const aimLen = Math.floor(nums.length / 2)
  let count = 0
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] == nums[i - 1]) {
      count++
    } else {
      count = 0
    }
    if (count >= aimLen) return nums[count]
  }
}

function solution2(nums:number[]) {
  const map = new Map()
  if (nums.length == 1) return nums[0]
  nums.sort((a, b) => a - b)
  nums.forEach((value:number)=>{
    map.set(value, 0)
  })
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] == nums[i - 1]) {
      map.set(nums[i - 1], map.get(nums[i - 1]) + 1)
    }
  }
  let max = 0
  map.forEach((value:number, key:number)=>{
    if (value >= max) max = key
  })
  return max
}