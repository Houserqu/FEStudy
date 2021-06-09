# -*- coding: UTF-8 -*-

import time, hashlib, hmac, json

from datetime import datetime

from httplib import HTTPConnection



# 请求参数

method = 'POST'

host = 'www.tdea.com'

uri = '/api/common/wx_payafter_order'

endpoint = 'https://' + host + uri

query_string = ''

request_parameters = '{"offerid":1}'



# 密钥参数

offer_id = '145004505'

secret_id = 'secretid'

secret_key = 'secretkey'



# 计算签名摘要函数

def sign(key, msg):

    return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()



# 获取派生密钥函数

def getSignatureKey(key, creDate, offerId):

    kDate = sign(('TDEA' + key).encode('utf-8'), creDate)

    kOfferId = sign(kDate, offerId)

    kSigning = sign(kOfferId, 'tdea_request')

    return kSigning



# 获取当前时间戳，以及相应的UTC标准时间日期

timestamp = int(time.time())

credDate = datetime.utcfromtimestamp(timestamp).strftime('%Y-%m-%d')



# ************* 计算签名 START *************



# ************* 步骤 1: 创建规范请求串 *************

canonical_uri = uri

canonical_querystring = query_string

canonical_headers = 'content-type:application/x-www-form-urlencoded\n' + 'host:' + host + '\n'

signed_headers = 'content-type;host'

payload_hash = hashlib.sha256(request_parameters).hexdigest()

canonical_request = method + '\n' + canonical_uri + '\n' + canonical_querystring + '\n' + canonical_headers + '\n' + signed_headers + '\n' + payload_hash

print 'canonical_request: \n%s' % canonical_request



# ************* 步骤 2: 创建签名串*************

algorithm = 'TDEA-HMAC-SHA256'

credential_scope = credDate + '/' + offer_id + '/' + 'tdea_request'

string_to_sign = algorithm + '\n' +  str(timestamp) + '\n' +  credential_scope + '\n' +  hashlib.sha256(canonical_request).hexdigest()

print '\nstring_to_sign: \n%s' % string_to_sign



# ************* 步骤 3: 计算签名 *************



# 计算派生签名密钥

signing_key = getSignatureKey(secret_key, credDate, offer_id)



# 计算签名摘要

signature = hmac.new(signing_key, (string_to_sign).encode('utf-8'), hashlib.sha256).hexdigest()



# ************* 步骤 4: 签名信息添加到请求头部 Authorization *************

authorization_header = algorithm + ' ' + 'Credential=' + secret_id + '/' + credential_scope + ',' +  'SignedHeaders=' + signed_headers + ',' + 'Signature=' + signature

print '\nAuthorization: \n%s' % authorization_header



# ************* 计算签名 END *************



# 公共参数添加到请求头部

headers = {

              'Authorization': authorization_header,

              'Host': host,

              'Content-Type': 'application/x-www-form-urlencoded',

              'X-TDEA-Timestamp': timestamp,

              'X-TDEA-Version': '2019092301',

          }



# ************* 发送HTTP请求 *************

print '\nRequest URL = ' + endpoint

conn = HTTPConnection(host)

conn.request(method, uri + '?' + query_string, request_parameters, headers)

http_resp = conn.getresponse()

print 'Response code: %d\n' % http_resp.status

print http_resp.read()