function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0])
  const res = [] as number[][]
  for (const interval of intervals) {
    if (!res.length || interval[0] > res[res.length - 1][1]) {
      res.push(interval)
    } else {
      res[res.length - 1][1] = Math.max(res[res.length - 1][1], interval[1])
    }
  }

  return res;
};
const res = merge([[1, 3], [2, 6], [8, 10], [15, 18]])
console.log('res', res)