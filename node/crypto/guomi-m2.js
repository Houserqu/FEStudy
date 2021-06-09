const sm2 = require('miniprogram-sm-crypto').sm2;
const queryString = require('querystring')
/**
 * 根据参数生成签名原串
 * @param params 
 * @param signKey 
 */
function buildParamsStr(params, signKey) {
  const keys = Object.keys(params).sort();
  return keys
    .map(key => `${key.toString()}=${params[key].toString()}`)
    .concat([signKey])
    .join('&');
}

/**
 * 国密算法生成签名
 * @param params
 * @param signKey
 * @param privateKey
 * @param der
 */
function signSm2(signStr, privateKey, publicKey, der = false){
  const sign = sm2.doSignature(signStr, privateKey, {
    hash: true,
    publicKey,
    der
  })

  console.log('签名原串:', signStr, '\n')
  console.log(`生成的签名(der=${der}, hex):`, sign, '\n')

  const signBase64 = Buffer.from(sign, 'hex').toString('base64')
  
  console.log(`生成的签名(der=${der}, base64):`, signBase64, '\n')

  return {
    sign,
    signBase64,
  }
}

/**
 * 签名校验
 * @param params 
 * @param signKey 
 * @param privateKey 
 * @param publicKey 
 * @param der 
 */
function verifySm2(signStr, sign, publicKey, der = false){
  return sm2.doVerifySignature(signStr, sign, publicKey, {
    hash: true,
    publicKey,
    der
  });
}

// 公钥
const publicKey = '043550bf48cf793de519a0545928cb3ee48c89cb9f8d1d38266e635ea7087e6588d6e4cb71b1790a4f16c56f6ace8bbc4e1b2f2e04c3477a02d2d2fd7fed63eed0'
// 私钥
const privateKey = 'bcb79337daa9afd0486499394177bef10c15060fc5a054ab2d319294ceb1504d'
// appkey
const signKey = '4zaizlTXDXPhZym2SRuY6CTEfkt4k7Mn'

// 要签名的参数
const params = { 
  action: 'direct_proivde',
  out_trade_no: '160639453533961050',
  ts: '1606394535',
  sign_type: 'SM2',
  offer_id: '1450016120',
  sub_merchant_id: '',
  product_id: 'txspvip_3month',
  buy_quantity: '1',
  contract_no: 'Test-888-CCH-20190521-01',
  provide_no_type: 'uin',
  provide_uin: '516282897',
  user_id: 'hanjunspirit',
  user_name: 'hanjun',
  user_id_type: 'taobao',
  user_ip: '10.175.129.45',
  version: '1.0',
  drm_info: '',
  activity_id: '',
  sale_price: '5100',
  sub_channel_id: 'tmall' 
}

const signStr = buildParamsStr(params, signKey)
const {sign} = signSm2(signStr, privateKey, publicKey)
console.log('签名验证结果:', verifySm2(signStr, sign, publicKey))

params.sig = signStr

console.log(`
  curl: 
  curl -X POST -H "Content-type: application/json" -d ${queryString.stringify(params)} 'https://sandbox.pay.qq.com/cgi-bin/rewardpf/reward_pf_exchange.fcg'
`)