"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
{
    const method1 = () => {
        fs_1.default.readFile('./demo.txt', 'utf-8', (err, data) => {
            if (err) {
                (0, console_1.error)(err);
                return;
            }
            console.log('data', data);
        });
    };
    const method2 = () => {
        try {
            const data = fs_1.default.readFileSync('./demo.txt', 'utf-8');
            console.log('data', data);
        }
        catch (e) {
            (0, console_1.error)(e);
        }
    };
    const method3 = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield promises_1.default.readFile('./demo.txt', 'utf-8');
            console.log('data', data);
        }
        catch (e) {
            (0, console_1.error)(e);
        }
    });
    const run = () => {
        method1();
        method2();
        method3();
    };
    run();
}
{
    const method1 = () => {
        fs_1.default.writeFile('./demo.txt', 'new content by1', (err) => {
            if (err) {
                (0, console_1.error)(err);
            }
        });
    };
    const method2 = () => {
        try {
            fs_1.default.writeFileSync('./demo.txt', 'new content by2', 'utf-8');
        }
        catch (e) {
            (0, console_1.error)(e);
        }
    };
    const method3 = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield promises_1.default.writeFile('./demo.txt', 'new content by3', 'utf-8');
        }
        catch (e) {
            (0, console_1.error)(e);
        }
    });
    method1();
    method2();
    method3();
}
{
    const method1 = () => {
        fs_1.default.appendFile('./demo.txt', '\nappend content by1', { encoding: 'utf-8' }, (err) => {
            if (err)
                (0, console_1.error)(err);
        });
    };
    const method2 = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield promises_1.default.appendFile('./demo.txt', '\nappend content by2', { encoding: 'utf-8' });
        }
        catch (e) {
            (0, console_1.error)(e);
        }
    });
    method1();
    method2();
}
