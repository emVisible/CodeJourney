function solution(prices: number[]) {
  let dp = Array.from(prices).fill(0).map(v => new Array(2).fill(0))
  let n = prices.length
  dp[0][0] = 0
  dp[0][1] = dp[0][0] - prices[0]
  for (let i = 1; i < n; i++) {
    // 前一天没有股票
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    // 前一天有股票
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
  }
  return dp[n - 1][0]
}

function solution2(prices: number[]) {
  let res = 0
  for (let i = 1; i < prices.length; i++) {
    res = res + Math.max(0, prices[i] - prices[i - 1])
  }
  return res
}