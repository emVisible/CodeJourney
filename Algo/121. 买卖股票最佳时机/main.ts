/**
 * 暴力法
*/
function solution(prices:number[]){
  let res = 0
  for (let i = 0 ; i < prices.length; i ++ ){
    const buy = prices[i]
    for (let j = i + 1; j < prices.length; j++) {
      if (prices[j] - buy >= res ) {
        res = prices[j] - buy
      }
    }
  }
  return res
}

const result = solution([7,1,5,3,6,4])
const result2 = solution([7,6,4,3,1])
console.log('result',result)
console.log('result2',result2)


function sulution2(prices:number[]){
  let minValue = Number.MAX_VALUE
  let maxProfit= 0
  for (let i = 0; i < prices.length; i ++ ){
    if (prices[i] < minValue) {
      minValue = prices[i]
    }else if (prices[i] - minValue > maxProfit){
      maxProfit = prices[i] - minValue
    }
  }
  return maxProfit
}


const result3 = solution([7,1,5,3,6,4])
const result4 = solution([7,6,4,3,1])
console.log('result3',result3)
console.log('result4',result4)