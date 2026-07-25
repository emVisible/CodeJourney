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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const util_1 = __importDefault(require("util"));
const file = "./main.ts";
const logMsg = (fileName) => {
    (0, console_1.log)(path_1.default.basename(fileName));
    (0, console_1.log)(path_1.default.dirname(fileName));
    (0, console_1.log)(path_1.default.extname(fileName));
    (0, console_1.log)(path_1.default.basename(fileName, path_1.default.extname(fileName)));
    (0, console_1.log)(path_1.default.join('C:/__temp', fileName));
    (0, console_1.log)(path_1.default.resolve(__dirname, path_1.default.basename(fileName)));
};
logMsg(file);
fs_1.default.open('./demo.txt', 'a+', (error, fd) => {
    console.log('fd', fd);
});
const readSync = () => {
    try {
        const fd = fs_1.default.openSync('./demo.txt', 'a+');
        console.log('fd', fd);
    }
    catch (e) {
        (0, console_1.error)(e);
    }
};
readSync();
const readAsync = () => __awaiter(void 0, void 0, void 0, function* () {
    let fileHandle;
    try {
        fileHandle = yield promises_1.default.open('./demo.txt', 'a+');
        console.log('fileHandle.fd', fileHandle.fd);
        const res = yield fileHandle.readFile({ encoding: 'utf-8' });
        console.log('res', res);
    }
    catch (e) {
        (0, console_1.error)(e);
    }
    finally {
        if (fileHandle) {
            yield fileHandle.close();
        }
    }
});
readAsync();
const readAsync2 = () => __awaiter(void 0, void 0, void 0, function* () {
    const open = util_1.default.promisify(fs_1.default.open);
    const fd = yield open('./demo.txt', 'r');
    console.log('fd(low version)', fd);
});
readAsync2();
