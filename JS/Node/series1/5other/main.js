"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const process_1 = __importDefault(require("process"));
const dotenv_1 = __importDefault(require("dotenv"));
const chalk_1 = __importDefault(require("chalk"));
const progress_1 = __importDefault(require("progress"));
(0, console_1.log)(process_1.default.env.USER_ID);
dotenv_1.default.config();
(0, console_1.log)(process_1.default.env.USER_ID);
(0, console_1.time)("Time start");
(0, console_1.count)("preview");
(0, console_1.count)("preview");
(0, console_1.countReset)("preview");
(0, console_1.count)("preview");
(0, console_1.count)("review");
(0, console_1.count)("preview");
(0, console_1.trace)();
(0, console_1.timeEnd)("Time start");
console.log('\x1b[33m%s\x1b[0m', 'function delete!');
console.log(chalk_1.default.cyan("halo"));
const createProgressBar = () => {
    const bar = new progress_1.default(":bar", { total: 10 });
    const timer = setInterval(() => {
        bar.tick();
        if (bar.complete) {
            clearInterval(timer);
        }
    }, 300);
};
createProgressBar();
