function canJump(nums: number[]): boolean {
  let rightMost = 0
  for (let i = 0; i < nums.length; i ++ ){
    if (i <= rightMost) {
      rightMost = Math.max(rightMost, nums[i] + i)
      if (rightMost >= nums.length) {
        return true
      }
    }
  }
  return false
};


const nums = [2,3,1,1,4]
const res = canJump(nums)
console.log('res',res)