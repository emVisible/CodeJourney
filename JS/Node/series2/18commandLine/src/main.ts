#! /home/young/.local/share/fnm/node-versions/v18.16.0/installation/bin/node

import { Command } from 'commander'
import pkg from '../package.json'

const program = new Command()

program.version(pkg.version)

program
  .command("Hi " + pkg.author + "!")
  .description("打招呼")
  .alias("h")
  .option('-e, --exclude <globalPatterns...>', '排除某些文件进行扫描')
  .option(
    '--allow-dirty',
    '默认屏蔽node_modules, .git等'
  )
  .action((name, options) => {
    console.log("Welcome", name, options.exlude, options.allowDirty)
  })

program.parse(process.argv)