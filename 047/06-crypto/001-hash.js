const crypto = require('crypto');

const hash1 = crypto.createHash('md5');
const hash2 = crypto.createHash('md5');
const hash3 = crypto.createHash('md5');

hash1.update('12345');
hash2.update(hash1.digest('hex'));
hash3.update('827ccb0eea8a706c4c34a16891f84e7b');

console.log(hash2.digest('hex'))
console.log(hash3.digest('hex'))