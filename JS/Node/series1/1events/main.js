"use strict";
exports.__esModule = true;
var console_1 = require("console");
var events = require("events");
var eventEmiter = new events.EventEmitter();
/**
 * 执行顺序
 *    1 main loop
 *    2 nextTick
 *    3 microtask queue
 *    4 macrotask queue
*/
/**
 * 注册handle event
*/
var listener = eventEmiter.on('handle', function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    console.log('🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹');
    console.log("test start");
    console.log('🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹');
    process.nextTick(function () {
        (0, console_1.log)('2 ' + arg);
        (0, console_1.log)("3 handle in nextTick queue");
    });
    setImmediate(function () {
        (0, console_1.log)('5 handle macrotask queue successfully');
    });
    Promise.resolve("handle in microtask queue")
        .then(function (msg) {
        console.log('4 ' + msg);
    });
    (0, console_1.log)("1 handle in main loop");
});
/**
 * 执行test开始算起, 3s内每隔1s执行一次注册到event loop的handle event
*/
function test() {
    if (!eventEmiter.listenerCount('handle')) {
        return;
    }
    eventEmiter.emit('handle', 'handle', 'demo', 'for learning event emitter');
    setTimeout(test, 1000);
}
setImmediate(test);
setTimeout(function () {
    listener.removeAllListeners();
    console.log('🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸');
    console.log("test end");
    console.log('🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸');
}, 3000);
