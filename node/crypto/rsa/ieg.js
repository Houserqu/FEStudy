const fs = require('fs')
const {sign, verify} = require('./rsa')

const params = {
  "platform_offerid": "1450016120",
  "offerid": "1234567890",
  "project_no": "wzry",
  "contract_no": "ieg-test-4",
  "contract_ext": "",
  "begin_valid_time": "2019-12-24 00:00:00",
  "end_valid_time": "2021-12-24 00:00:00",
  "contract_type": 5,
  "department": "计费平台部",
  "deliver_email": "houserqu@tencent.com",
  "products": [{"ams_id": "txspvip_1month","cdkey_amount": 100, "direct_amount": 200}],
  "orders": [{"name": "首款", "price": 600000 }, {"name": "尾款", "price": 1000000}],
  "goods": [{"product_id": "ad", "name": "广告", "total_price": 1000000, "number": 2}],
  "contact_doc": "20210201165929406624",
  "contact_doc_sig": "a3e2e73c6c8d7fb0a3ef0a5bbec3b484",
  "ts": 1612253472
}

const appkey = 'UmiiIupjNEW4spK6sXH2pXzsDf3cidOl'

// 计算签名原串
const queryString = Object.keys(params).sort().map(key => `${key}=${typeof params[key] === 'string' ? params[key] : JSON.stringify(params[key])}`).join('&') + '&' + appkey

const privateKey = fs.readFileSync('./cert/rsa_private_key.pem').toString() // 私钥
const signData = sign(privateKey, queryString) // 进行签名

console.log(queryString, signData)