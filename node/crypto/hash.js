const crypto = require('crypto')

const hash = crypto.createHash('sha1') // 算法：md5, sha1, sha256, sha512

hash.update('data1') // 写入加密数据 <string> | <Buffer> | <TypedArray> | <DataView>
hash.update('data2') // 多次调用会追加加密数据

const result = hash.digest('hex'); // 加密  字符编码 hex, base64, utf8 ...
console.log(result)
