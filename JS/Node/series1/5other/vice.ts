import {createInterface} from "readline";
import inquirer from 'inquirer'
/**
 * 基础cli
*/
const readline = createInterface({
  input:process.stdin,
  output:process.stdout
})

readline.question("how long gramming today", (res)=>{
  console.log('res',res)
  readline.close()
})

/**
 * 定制化cli——inquirer
*/
const questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's your name?",
  },
];

inquirer.prompt(questions).then(answers => {
  console.log(`Hi ${answers.name}!`);
});
