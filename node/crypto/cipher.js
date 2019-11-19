const crypto = require('crypto');
// 加解密封装
function aesEncrypt(algorithm, data, key) {
  const cipher = crypto.createCipher(algorithm, key);
  var crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function aesDecrypt(algorithm, encrypted, key) {
  const decipher = crypto.createDecipher(algorithm, key);
  var decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const data = '123456', key = '123';
const encodeData = aesEncrypt('aes-256-cbc', data, key)
console.log(encodeData)
console.log(aesDecrypt('aes-256-cbc', encodeData, key))