const crypto = require('crypto');
const fs = require('fs')

// 签名算法封装
function signer(algorithm, key, data){
  const sign = crypto.createSign(algorithm);
  sign.update(data);
  const signData = sign.sign(key, 'hex');
  return signData;
}

// 验证算法封装
function verify(algorithm, pubkey, sig, data){
  var verify = crypto.createVerify(algorithm);
  verify.update(data);
  return verify.verify(pubkey, sig, 'hex')
}

const algorithm = 'RSA-SHA256'; // 算法
const data = '123456' // 待签名数据
const privateKey = fs.readFileSync('./cert/rsa_private_key.pem').toString() // 私钥
const publicKey = fs.readFileSync('./cert/rsa_public_key.pem').toString() // 公钥

const signData = signer(algorithm, privateKey, data) // 进行签名

console.log(verify(algorithm, publicKey, signData, data)) // true 签名验证成功
console.log(verify(algorithm, publicKey, signData, data + '123')) // false 数据篡改，签名验证失败
