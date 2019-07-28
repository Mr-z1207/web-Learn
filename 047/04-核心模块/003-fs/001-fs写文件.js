const fs = require('fs')
const util = require('util')
// 写文件三步 1.打开 2.写入 3.保存

// 1.同步写
// 1.1 逐步操作*********************************************
// 1.打开
const fd = fs.openSync("data/data.txt",'w') //'r'读  'w'写(覆盖原文) 'a'追加文字
// 2.写入
fs.writeSync(fd,'hello')
// 3.保存
fs.closeSync(fd)

//*********************************************************

// 1.2 合并操作
fs.writeFileSync("data/data.txt",' world',{flag:'a'})


//*********************************************************
// 2.异步写
// 1.1 逐步操作*********************************************
// 1.打开
fs.open("data/data.txt",'a',(err,fd)=>{   //异常优先
	if(err){
		console.log('open file error::',err)
	}else{
		console.log(fd)
		// 2.写入
		fs.write(fd,'\nhello',(err)=>{
			if (err) {
				console.log('write file error::',err)
			}else{
				console.log('write file ok::')
			}
			// 3.保存
			fs.close(fd,(err)=>{
				if (err) {
					console.log('close file error::',err)
				}else{
					console.log('close file ok::')
				}
			})
		})
	}
})


//*********************************************************

// 1.2 合并操作
fs.writeFile("data/data.txt",' world!',{flag:'a'},(err)=>{
	if (err) {
		console.log('writeFile file error::',err)
	}else{
		console.log('writeFile file ok::')
	}
})

//*********************************************************
console.log('do somesing..........................')

//*********************************************************
// 3.promise处理异步
const writeFiler = util.promisify(fs.writeFile)

writeFiler("data/data.txt",'\nhello world!!',{flag:'a'})
.then(data=>{
	console.log('writeFiler  ok!!',data)
})
.catch(err=>{
	console.log(err)
})