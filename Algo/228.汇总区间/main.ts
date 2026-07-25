function summaryRanges(nums: number[]): string[] {
  if (!nums.length) return []
  if (nums.length == 1) return [nums[0].toString()]
  const res = []
  let tmp = [nums[0]]
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] != 1) {
      const start = tmp.shift().toString()
      if (tmp.length == 0) {
        res.push(`${start}`)
      } else {
        const end = tmp.pop().toString()
        res.push(`${start}` + '->' + `${end}`)
      }
      tmp = []
    }
    tmp.push(nums[i])
  }
  if (tmp.length) {
    if (tmp.length == 1) { res.push(tmp[0].toString()) }
    else {
      const start = tmp.shift()
      const end = tmp.pop()
      res.push(`${start}` + '->' + `${end}`)
    }
  }
  return res
};

const res = summaryRanges([0, 1, 2, 4, 5, 7])
const res2 = summaryRanges([0, 2, 3, 4, 6, 8, 9])
console.log('res', res)
console.log('res2', res2)