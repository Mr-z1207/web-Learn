//导入模块
//返回引入文件的module.exports对象
const m5 = require('./m5.js')  //用相对路径时注意,当前目录一定要写“./”,否则表明要加载系统的核心模块
//const {str,fn,obj} = require('./m5.js')
/*
fn()
console.log(str)
console.log(obj)
*/
console.log(m5)

// m5.fn()