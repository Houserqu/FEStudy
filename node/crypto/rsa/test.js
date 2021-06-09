const fs = require('fs')
const {sign, verify} = require('./rsa')


// const data = 'action=direct_proivde&buy_quantity=1&contract_no=Test-888-CCH-20190521-01&drm_info=&offer_id=1450016120&out_trade_no=159498625602846531&product_id=txspvip_1month&provide_no_type=uin&provide_uin=741387290&sale_price=2000&sig=&sub_channel_id=tmall&sub_merchant_id=&ts=1594986256&user_id=hanjunspirit&user_id_type=taobao&user_ip=10.175.129.45&user_name=hanjun&version=1.0&UmiiIupjNEW4spK6sXH2pXzsDf3cidOl' // 待签名数据
const data = 'offer_id=1450020373&ts=1605011390&version=1.0&f2ME1I1zAJVJtxMKpnO7Sg6hMVGX5n3f'

const privateKey = fs.readFileSync('./cert/rsa_private_key.pem').toString() // 私钥
const publicKey = fs.readFileSync('./cert/rsa_public_key.pem').toString() // 公钥

const signData = sign(privateKey, data) // 进行签名

console.log(signData)

console.log(verify(publicKey, signData, data)) // true 签名验证成功