"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const inquirer_1 = __importDefault(require("inquirer"));
const readline = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout
});
readline.question("how long gramming today", (res) => {
    console.log('res', res);
    readline.close();
});
const questions = [
    {
        type: 'input',
        name: 'name',
        message: "What's your name?",
    },
];
inquirer_1.default.prompt(questions).then(answers => {
    console.log(`Hi ${answers.name}!`);
});
