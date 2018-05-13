var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = require('../../src/models/Users.js');
var session = require('express-session');
var fs = require('fs');
var path = require('path');

var NodeRsa = require('node-rsa')
var crypto =require('crypto');
var key = new NodeRsa({b:512})
key.setOptions({encryptionScheme:'pkcs1'})


/* GET login page. */
router.post('/', function(req, res, next) {

//封装解密函数
  function rsaDecrypt(text) {
    const privateKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
      'MIICXQIBAAKBgQCf9x+8YaLbJyvZOVsA+gf8IRWJd+e0sxtKoToCTTFshNUu9Ce2\n' +
      'BJOy5agAlmYAotr4623eoK3L+50MxRC8f5L2bp6qyeIB9vIt29vAfAjwhuNK1l3F\n' +
      'wQ8aVwHpIVg6FR9HeJmv2+i/AQqj3hnF+eDiUwQZqzfkbY+1vMHwSoGNhwIDAQAB\n' +
      'AoGBAIx3KDr3UVY3k11v6+VzqMdRFeRcke4uyGxEHvgeaKPuEHTmmGhQpJGW8Gtz\n' +
      'paYxWy7xLM0tMu/HxiSMdyHOtHClJ6xlFiy/ciAU8URNK/u/sgZhRaNGrla0X+Gx\n' +
      'W5UP4ywCU4R24N5bxLO9mlAkgEMw4DgeVdi7VT3fdXkYrcqhAkEA0NcUtdy8m5Kl\n' +
      'vGwgrdsI56LYSaoDW4/CXufPwWJOhmIocB3AczLqZBd/XajZJH0PTY5N+xRD+aho\n' +
      'PwBGl9Ip0wJBAMQWnp2pjaVmi2s2yQFMvMajsTj/98tcKLbk0K52HS/cZzvf9bKH\n' +
      '70iBHzBcFK3ixFYavXopZWhUKPmj358d6P0CQQClFpERnpgeJ1QK2jMPHEoyykFO\n' +
      'Ii6bT85oNbm+9pZ6lte+oVZD+qjdTNHrWRGmTZIuTeMJKyD9F4qo2u/zDjjvAkA0\n' +
      'XpIoK2NgHD35+Vy/kx4LsyYewgYM8uUQy5WMMpFi+es8S3kUIEfgxlNtF/qR4jFr\n' +
      'iaK3IJ0ruuZinciYd2WFAkAexw6cBoAX6tSgRPIhIR/1AWRR3lrqKFuACUAkAaO8\n' +
      '4vKK7o9P6uJGv4ELEyfQbD+/IyGWLGCIBFNBVKyzrRxz\n' +
      '-----END RSA PRIVATE KEY-----\n';
    var buffer = new Buffer(text,"base64")
    var decrypted = crypto.privateDecrypt({
      key:privateKey,
      padding:crypto.constants.RSA_PKCS1_PADDING
    },buffer)
    return decrypted.toString('utf-8');
  }


  //
  // res.setHeader("Access-Control-Allow-Origin","http://localhost:3000"); /**设置响应头允许ajax跨域访问**/
  //
  // res.header('Access-Control-Allow-Credentials:true');/*解决跨域sessionid不一致的问题*/
  // res.setHeader("Access-Control-Allow-Methods","GET,POST");/*星号表示所有的异域请求都可以接受，*/

  // console.log("客户端数据"+JSON.stringify(req.body))

  User.findOne({
    username : req.body.name
  },function (err,docs) {
    // console.log("查询数据库结果为："+JSON.stringify(docs))
    if (err){
      // console.log(err)
      res.json({errorCode:1,errorMessage:'服务器挂掉了。。。'})

    }else if(docs){
      var sess = req.session;
      var password = rsaDecrypt(req.body.password)//解密

      // req.session.regenerate(function(err) {//创建session
        if(err){
          res.json({
            errorCode: 2,
            errorMessage: "session出问题啦！！"
          })
          return
        }
        if (docs.password == password) {
          // console.log("登录成功："+docs);

          // console.log(req.sessionID)
          if(!docs.imgURL){
            docs.imgURL = "../../img/default_head.jpg";
          }

          req.session.password = docs.password
          req.session.username = req.body.name
          // req.session={
          //   username : docs.username,
          //   password : docs.password
          // }
          res.json({
            errorCode: 0,
            errorMessage: "",
            data:{
              photo:"http://localhost:3001/getimg?path="+docs .imgURL
            }
          })
          // res.render('index', { title: req.query.name });

        } else {
          // console.log("密码错误")

          res.json({
            errorCode: -1,
            errorMessage: "用户名或密码错误"
          })
          // res.render('index',{title:"密码错误"})

        }
      // })


    }else {
      res.json({
        errorCode:-2,
        errorMessage: "用户尚未注册"
      })
      // console.log("该用户尚未注册")
    }
  })


});

module.exports = router;
