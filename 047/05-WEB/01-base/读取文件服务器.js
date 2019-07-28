const http = require('http')
const path = require('path')
const fs = require('fs')
const MIME = require('./MIME.json')

const server = http.createServer((req,res)=>{
	// req request 可读流
	// res response 可写流
	// console.log(req)
	var filePath = path.normalize(__dirname + '/static/' + req.url)  //normalize规范化给定的 path  ; __dirname 当前文件路径
	console.log(filePath)

	fs.readFile(filePath,(err,data)=>{
		if(err){
			res.setHeader('Content-Type', 'text/html;charset=UTF-8');
			res.end('<h1>请求出错</h1>')
		}else{
			//根据扩展名设置正确的 MIME 类型
			const extName = path.extname(filePath)
			// console.log(MIME)
			// console.log(extName)
			const MIMEType = MIME[extName] || 'text/plain'
			res.setHeader('Content-Type', MIMEType + ';charset=UTF-8');
			res.end(data)
		}
	})
})

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running on http://127.0.0.1:3000')
})