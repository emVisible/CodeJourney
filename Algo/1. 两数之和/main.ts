function twoSum(nums: number[], target: number): number[] {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i]
    }
    map.set(nums[i], i)
  }
  return []
};

const res = twoSum( [2,7,11,15], 9)
const res2 = twoSum( [3,2,4], 6)

console.log('res',res)
console.log('res2',res2)