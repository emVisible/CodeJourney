function insert(intervals: number[][], newInterval: number[]): number[][] {
  let left = newInterval[0]
  let right = newInterval[1]
  const res = []
  let placed = false
  for (const [l, r] of intervals) {
    if (l > right) {
      if (!placed) {
        res.push([left, right])
        placed = true
      }
      res.push([l, r])
    }else if (r < left) {
      res.push([l, r])
    }else {
      left = Math.min(l, left)
      right = Math.max(right, r)
    }
  }
  if (!placed){
    res.push([left, right])
  }
  return res
};

const res = insert([[1, 3], [6, 9]], [2, 5])
console.log('res', res)