"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const fs = __importStar(require("fs"));
const fsPromise = __importStar(require("fs/promises"));
class Stat {
    constructor() {
        this.stat_async2();
    }
    stat_sync() {
        console.log('🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹');
        console.log("start");
        console.log('🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹');
        try {
            const stats = fs.statSync('./demo.txt');
            console.log('stats', stats);
        }
        catch (e) {
            (0, console_1.error)(e);
        }
        console.log('🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸');
        console.log("end");
        console.log('🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸');
    }
    stat_async() {
        return __awaiter(this, void 0, void 0, function* () {
            this.stat = yield new Promise((resolve, reject) => {
                fs.stat('./demo.txt', (err, stat) => {
                    if (err) {
                        (0, console_1.error)(err);
                        reject(err);
                    }
                    resolve(stat);
                });
            });
        });
    }
    stat_async2() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.stat = yield fsPromise.stat('./demo.txt');
            }
            catch (e) {
                console.error('e', e);
            }
        });
    }
    isDirectory() {
        return this.stat.isDirectory() || "Error";
    }
    isFile() {
        return this.stat.isFile() || "Error";
    }
}
new Promise((resolve, reject) => {
    resolve(new Stat());
})
    .then((s) => {
    setTimeout(() => {
        const isDir = s.isDirectory();
        const isFile = s.isFile();
        (0, console_1.log)(`${isDir ? "dir" : isFile ? "file" : "unknown type"}`);
    }, 1000);
});
