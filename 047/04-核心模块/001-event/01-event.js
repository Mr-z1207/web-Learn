const EventEmitter = require('events')

class Emitter extends EventEmitter{
	
}

const e1 = new Emitter()

//绑定事件
e1.on('test',(i)=>{
	console.log('test1....' + i)
})
e1.addListener('test',off=(i)=>{
	console.log('test2....' + i)
})
e1.once('test',(i)=>{              //只触发一次
	console.log('test3....' + i)
})

//移出事件
e1.off('test',off)
//触发时间
e1.emit('test',i=0)