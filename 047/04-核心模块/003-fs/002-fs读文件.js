const fs = require('fs')
const util = require('util')
// 读文件三步 1.打开 2.读取 3.关闭
const buf = Buffer.alloc(100)

// 1.同步读
// 1.1 逐步操作*********************************************
// 1.打开
// const fd = fs.openSync('data/data.txt','r')
// // 2.读取
// fs.readSync(fd,buf,0,100,0)
// console.log(buf)
// // 3.关闭
// fs.closeSync(fd)
//*********************************************************

// 1.2 合并操作
// var a = fs.readFileSync('data/data.txt',{encoding:'utf8'})
// console.log(a)
//*********************************************************
// 2.异步读
// 1.1 逐步操作*********************************************
// 1.打开
// fs.open("data/data.txt",'r',(err,fd)=>{   //异常优先
// 	if(err){
// 		console.log('open file error::',err)
// 	}else{
// 		console.log(fd)
// 		// 2.写入
// 		fs.read(fd,buf,0,100,0,(err)=>{
// 			if (err) {
// 				console.log('read file error::',err)
// 			}else{
// 				console.log('read file ok::')
// 				console.log(buf)
// 			}
// 			// 3.关闭
// 			fs.close(fd,(err)=>{
// 				if (err) {
// 					console.log('close file error::',err)
// 				}else{
// 					console.log('close file ok::')
// 				}
// 			})
// 		})
// 	}
// })


//*********************************************************

// 1.2 合并操作
// fs.readFile('data/data.txt',{encoding:'utf8'},(err,data)=>{
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log(data)
// 	}
// })

//*********************************************************

//*********************************************************
// 3.promise处理异步
const readFile = util.promisify(fs.readFile)

readFile('data/data.txt',{encoding:'utf8'})
.then(data=>{
	console.log(data)
})
.catch(err=>{
	console.log(err)
})