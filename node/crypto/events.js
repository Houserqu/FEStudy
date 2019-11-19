const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter(); // 初始化事件对象

myEmitter.on('event', (message) => {  // 创建事件监听 (eventName, listener), eventName 支持使用 symbol
  console.log('event: ', message);
});

myEmitter.emit('event', 'hello word'); // 触发事件，(eventName[, ...args])