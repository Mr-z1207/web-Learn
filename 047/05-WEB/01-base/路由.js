//核心模块
const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
const util = require('util')
const querystring = require('querystring')
//自定义模块
const swig  = require('swig')
//本地模块
const mime = require('./MIME.json')
const {getData,writeData,remData} = require('./static/Model/item.js')

const server = http.createServer((req,res)=>{
	//路由:根据不同的请求，做不同的处理
	const urlParse = url.parse(req.url,true)
	// console.log(urlParse)
	const urlPathname = urlParse.pathname
	// console.log(urlPathname)
	const urlQuery = urlParse.query
	// console.log(urlQuery)

	
	if (urlPathname == '/' || urlPathname == '/index.html'){
		getData().then(data=>{
			const filePath = path.normalize(__dirname + '/static/' + urlPathname)  //normalize规范化给定的 path  ; __dirname 当前文件路径
			//引入模板  //详见：https://github.com/paularmstrong/swig
			const template = swig.compileFile(filePath)  //index.html的路径，把其作为模板(template是一个模板函数)
			const html = template({
				items:data
			})
			// console.log(html)
			res.setHeader('Content-Type', 'text/html;charset=UTF-8');
			res.end(html)
		})
		.catch(err=>{
			res.setHeader('Content-Type', 'text/html;charset=UTF-8');
			res.end('<h1>请求出错</h1>')
		})
	}else if(urlPathname == '/add') {
		let newData = ""
		req.on('data',chunk=>{
			newData += chunk
		})
		req.on('end',()=>{
			const objData = querystring.parse(newData)
			// console.log(objData)
			writeData(objData.task)
			.then(data=>{
				// console.log('ok1111')
				// console.log(data)
				res.end(JSON.stringify({
					code:0,
					mas:'写入成功',
					data:data
				}))
			})
			.catch(err=>{
				console.log(err)
			})
		})
		//自己瞎写的***********************************************************
		/*
		getData().then(data=>{
			let newData = ""
			req.on('data',chunk=>{
				newData += chunk
			})
			req.on('end',()=>{
				data.push({
					id:data[data.length-1].id -0+1+"",
					task:newData
				})
				fs.writeFile("static/data/item.json",JSON.stringify(data),{flag:'w'},(err)=>{
					if (err) {
						console.log('writeFile file error::',err)
					}else{
						res.end(newData)
					}

				})
			})
		})
		*/
		//自己瞎写的***********************************************************
	}
	else if(urlPathname == '/rem'){
		const id = urlQuery.id
		remData(id)
		.then(data=>{
			res.end(JSON.stringify({
				code:0,
				mas:'删除成功',
			}))
		})
		.catch(err=>{
			console.log(err)
		})
	}
//*******************************静态资源请求*******************************************
	else{
		const filePath = path.normalize(__dirname + '/static/' + urlPathname)  //normalize规范化给定的 path  ; __dirname 当前文件路径
		// console.log(filePath)

		fs.readFile(filePath,(err,data)=>{
			if(err){
				res.setHeader('Content-Type', 'text/html;charset=UTF-8');
				res.end('<h1>请求出错</h1>')
			}else{
				//根据扩展名设置正确的 MIME 类型
				const extName = path.extname(filePath)
				const MIMEType = mime[extName] || 'text/plain'
				res.setHeader('Content-Type', MIMEType + ';charset=UTF-8');
				res.end(data)
			}
		})
	}
//************************************************************************************


})

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running on http://127.0.0.1:3000')
})