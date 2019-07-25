// Buffer是用来存放二进制数据的容器
const buf1 = Buffer.from('啊')

console.log(buf1.toString())

// 一个二进制的0 或者 1 代表了 1bit(位)
// 8bit(位) = 1B(字节) = 2个16进制数
// 1kb = 1024B
// 1MB = 1024kb
// 1GB = 1024MB
// 1TB = 1024GB

const buf2 = Buffer.alloc(10,'z') //'z'默认填充
buf2[1] = 0xaa
console.log(buf2)
