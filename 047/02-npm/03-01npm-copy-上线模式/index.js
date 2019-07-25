// npm install --production 只安装package.json中dependencies 中的包
// 只需要复制  package.json  package-lock.json  index.js这三个文件
//参数--save-dev: 依赖会加在package.json的devDependencies中,一般是辅助开发的依赖,不会打包上线的 工具而已

const $ = require('jquery')

console.log($)