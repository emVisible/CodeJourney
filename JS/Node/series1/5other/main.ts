import { count, countReset, log, time, timeEnd, trace } from "console";
import process from "process";
import dotenv from 'dotenv'
import chalk from "chalk";
import ProgressBar from 'progress'

/**
 * 通过cli传递env
 *     USER_ID=12528174 node main
*/
log(process.env.USER_ID)

/**
 * 通过dotenv + .env文件进行传递
*/
dotenv.config()
log(process.env.USER_ID)

/**
 * console内置其他API：
 *    time && timeEnd
 *    count && countReset
 *    trace
*/
time("Time start")
count("preview")
count("preview")
countReset("preview")
count("preview")
count("review")
count("preview")
trace()
timeEnd("Time start")
/**
 * 使用chalk包高级API输出绚烂的颜色
*/
console.log('\x1b[33m%s\x1b[0m', 'function delete!');
console.log(chalk.cyan("halo"))
/**
 * 简易进度条——使用progress创建bar
*/
const createProgressBar = () => {
  const bar = new ProgressBar(":bar", { total: 10 })
  const timer = setInterval(() => {
    bar.tick()
    if (bar.complete) {
      clearInterval(timer)
    }
  }, 300)
}
createProgressBar()

