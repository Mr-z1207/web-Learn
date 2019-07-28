const fs = require('fs')

const WS = fs.createWriteStream('data/data.txt')
const RS = fs.createReadStream('data/data.txt')

WS.write('你好')
WS.write('世界')
WS.end()

RS.on('data',chunk=> {
  console.log(`接收到::${chunk.length}个字节的数据`);
  console.log(`接收到::${chunk}`);
});

RS.read()
