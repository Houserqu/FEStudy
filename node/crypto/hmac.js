const crypto = require('crypto')

const hmac = crypto.createHmac('sha1', 'secret')  // 算法：md5, sha1, sha256, sha512

hmac.update('data')

const result = hmac.digest('hex'); // 加密  字符编码 hex, base64, utf8 ...
console.log(result)