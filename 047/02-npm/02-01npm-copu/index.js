// npm install 会安装 package.json中的所有依赖
// 只需要复制  package.json  package-lock.json  index.js这三个文件

//参数--save:把包的版本信息添加到package.json中dependencies 中(默认),一般是需要最终需要打包到业务代码中的依赖


//package.json 可以锁定大版本但不锁定小版本
// 安装包后还会生成一个package-lock.json文件,这个文件会锁定安装的这个版本
//所以需要两个文件都要copy