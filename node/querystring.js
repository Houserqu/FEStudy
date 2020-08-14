const querystring = require('querystring');

const content = encodeURIComponent('k=3&l=23')
const str = encodeURIComponent('contract_no=rebate-price&product_id=cjys_1month&sub_merchant_id=1001&balance=800')

console.log(str)

console.log(querystring.parse(decodeURIComponent(str)))