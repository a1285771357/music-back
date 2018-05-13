var express = require('express');
var router = express.Router();
var NodeRsa = require('node-rsa')
var key = new NodeRsa({b:512})
key.setOptions({encryptionScheme:'pkcs1'})

router.get('/', function(req, res, next) {
  /**设置响应头允许ajax跨域访问**/
  res.setHeader("Access-Control-Allow-Origin","*");
  /*星号表示所有的异域请求都可以接受，*/
  res.setHeader("Access-Control-Allow-Methods","GET,POST");

  var publicKey = key.exportKey('public');
  var privateKey = key.exportKey('private')
  console.log('公钥'+publicKey)
  console.log('私钥'+privateKey)
  var text = 'asdf'
  // var encrypted = key.encryptPrivate(text,'base64','utf-8');//加密
  var encrypted = key.encrypt(text,'base64','utf-8');//加密
  console.log('加密'+encrypted)
  // var decrypted = key.decryptPublic(encrypted,'utf-8');//解密
  var decrypted = key.decrypt("SXpd43kQlt2DfqiWAngySzw/G+ldB8ehytuM+yp4i5xCxJFN/ioW2xKFMhHafMwJ/v3623DtJJ82hPKpDusa+A==",'utf-8');//解密
  console.log('解密'+decrypted)

});

module.exports = router;
