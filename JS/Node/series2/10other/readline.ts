import readline from 'readline'

/**
 * readline, 流数据读取 && 写入
*/
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.setPrompt("[System] ")
rl.on('line', (data: string) => {
  rl.prompt()
  if (data == 'exit') {
    rl.close()
  }
  switch (data) {
    case 'hi':
      console.log('Hello')
      break;
    default:
      console.log('You are saying:[', data, ']')
  }
})
rl.on('close', () => {
  rl.prompt()
  console.log('bye')
  process.exit()
})