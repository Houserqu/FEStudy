const crypto = require('crypto');

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

module.exports = {
  sign,
  verify
}