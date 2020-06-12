const crypto = require('crypto');
const fs = require('fs')

/**
 * rsa 签名
 * @param {string} privatekey 私钥
 * @param {*} data 签名原串
 * @param {string} algorithm rsa 签名算法
 * @param {*} encode 编码类型
 */
function sign(privatekey, data, algorithm = 'RSA-SHA256', encode = 'base64'){
  const sign = crypto.createSign(algorithm);
  sign.update(data);
  const signData = sign.sign(privatekey, encode);
  return signData;
}

/**
 * rsa 校验
 * @param {*} publickkey 公钥匙
 * @param {*} sig 公钥加密生成的签名串
 * @param {*} data 签名原串
 * @param {*} algorithm rsa 算法
 * @param {*} encode 编码类型
 */
function verify(publickkey, sig, data, algorithm = 'RSA-SHA256', encode = 'base64'){
  var verify = crypto.createVerify(algorithm);
  verify.update(data);
  return verify.verify(publickkey, sig, encode)
}

const data = 'begin_date=2020-06-11&contract_no=txsp-mg-20200427&end_date=2020-06-11&offer_id=1450024366&ts=1591948623&version=1.0&y0ivEfdk041yxIpqhQPjhklr1tjF6XoE' // 待签名数据
const privateKey = fs.readFileSync('./cert/rsa_private_key.pem').toString() // 私钥
const publicKey = fs.readFileSync('./cert/rsa_public_key.pem').toString() // 公钥

const signData = sign(privateKey, data) // 进行签名

console.log(verify(publicKey, signData, data)) // true 签名验证成功
console.log(verify(publicKey, signData, data + '123')) // false 数据篡改，签名验证失败
