/**
 * 同步派发任务到子进程, 子进程返回数据, 父进程接收
*/
import { spawnSync } from 'child_process'

function fetchSync(url: string, options = {}) {
  const child = spawnSync(process.argv[0], [
    "./vice.js",
    JSON.stringify(url),
    JSON.stringify(options)
  ])
  const res = child.stdout.toString()

  const data = JSON.parse(res)
  console.log('data', data)
  return data.body
}
fetchSync('https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot&count=3&from=1&aid=2608&uuid=7145810834685003271&spider=0')

