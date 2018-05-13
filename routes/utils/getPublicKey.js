var express = require('express');
var router = express.Router();
var NodeRsa = require('node-rsa')
var key = new NodeRsa({b:512})
key.setOptions({encryptionScheme:'pkcs1'})

router.post('/', function(req, res, next) {
  /**设置响应头允许ajax跨域访问**/
  res.setHeader("Access-Control-Allow-Origin","*");
  /*星号表示所有的异域请求都可以接受，*/
  res.setHeader("Access-Control-Allow-Methods","GET,POST");

  var publicKey = '-----BEGIN PUBLIC KEY-----\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCf9x+8YaLbJyvZOVsA+gf8IRWJ\n' +
    'd+e0sxtKoToCTTFshNUu9Ce2BJOy5agAlmYAotr4623eoK3L+50MxRC8f5L2bp6q\n' +
    'yeIB9vIt29vAfAjwhuNK1l3FwQ8aVwHpIVg6FR9HeJmv2+i/AQqj3hnF+eDiUwQZ\n' +
    'qzfkbY+1vMHwSoGNhwIDAQAB\n' +
    '-----END PUBLIC KEY-----\n';
  var privateKey = key.exportKey('private');
  res.json({publicKey:publicKey})

});

module.exports = router;
