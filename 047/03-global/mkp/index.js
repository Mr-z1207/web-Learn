//制定项目创建前端项目文件夹目录结构
const fs = require('fs')
//1、获取名称
const pathName = process.argv[2]
//2、建立文件夹
function mkp() {
	fs.mkdirSync(pathName)
	fs.mkdirSync(pathName + '/css')
	fs.mkdirSync(pathName + '/js')
	fs.mkdirSync(pathName + '/img')
}

module.exports = mkp