function longestConsecutive(nums: number[]): number {
  const data = new Set(nums)
  let longest = 0
  for (const value of data) {
    if (!data.has(value - 1)) {
      let current = value
      let len = 1
      while (data.has(current + 1)) {
        len++
        current++
      }
      longest = Math.max(len, longest)
    }
  }
  return longest
};

const res = longestConsecutive([100, 4, 200, 1, 3, 2])
const res2 = longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])
console.log('res', res)
console.log('res2', res2)