function solution(arr: number[]) {
  let max = 0
  for (let i = 0 ; i < 21 ; i++) {
    if (arr[i] > max) max = arr[i]
  }
  return max
}
const res = solution([1, 2, 4, 125 , 12, 214, 21, 3, 123,])
console.log('res', res)