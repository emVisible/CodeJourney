#!/usr/bin/node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const folderName = path_1.default.resolve(__dirname, 'newDir');
const createDir = () => {
    try {
        if (!fs_1.default.existsSync(folderName)) {
            fs_1.default.mkdirSync(folderName);
        }
    }
    catch (e) {
        (0, console_1.error)(e);
    }
};
createDir();
const readDir = () => {
    const files = fs_1.default.readdirSync(folderName)
        .map(fileOriginName => path_1.default.join(folderName, fileOriginName))
        .filter(fileName => {
        const isFile = fs_1.default.lstatSync(fileName).isFile();
        if (!isFile) {
            const patterns = fileName.split('\\').pop().concat();
            const newName = fileName.replace(patterns, 'renameAfterDir');
            fs_1.default.rename(fileName, newName, (err) => {
                if (err)
                    (0, console_1.error)(err);
            });
        }
        else {
            return fileName;
        }
    });
    console.log('files', files);
};
readDir();
const removeDir = () => {
    (0, console_1.log)('waste dir will remove after 3s');
    const dirPath = path_1.default.resolve(__dirname, 'waste');
    fs_1.default.mkdirSync(dirPath);
    setTimeout(() => {
        fs_1.default.rmdirSync(dirPath);
    }, 3000);
};
const removeAll = () => {
    const dirPath = path_1.default.resolve(__dirname, 'waste');
    fs_1.default.rm(dirPath, { recursive: true, force: true }, (err) => {
        if (err)
            (0, console_1.error)(err);
    });
};
removeDir();
