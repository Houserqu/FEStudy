const fs = require('fs')
const {sign, verify} = require('./rsa')

const data = 'begin_date=2020-06-11&contract_no=txsp-mg-20200427&end_date=2020-06-11&offer_id=1450024366&ts=1591948623&version=1.0&y0ivEfdk041yxIpqhQPjhklr1tjF6XoE' // 待签名数据
const privateKey = fs.readFileSync('./cert/rsa_private_key.pem').toString() // 私钥
const publicKey = fs.readFileSync('./cert/rsa_public_key.pem').toString() // 公钥

const signData = sign(privateKey, data) // 进行签名

console.log(verify(publicKey, signData, data)) // true 签名验证成功
