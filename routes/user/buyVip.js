var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var session = require('express-session');
var User = require("../../src/models/Users")
var fs = require('fs');
var path = require('path');
var redis = require('redis')
var redisClient = redis.createClient("6379", "127.0.0.1")

/* GET logout page. */
router.post('/', function(req, res, next) {

  redisClient.get("sess:"+req.sessionID,function (err,result) {//redis查询是否登录
    // var errorCode=0,errorMessage=""
    if (err){
      var errorCode=-1,errorMessage="服务器迷失了自我@a@"
      res.json({
        errorCode:errorCode,
        errorMessage:errorMessage
      })
      return
    }else{
      if(result){
        if (!req.body.username){
          console.log("传参错误")
          return
        }
        User.find({username:req.body.username},{isVip:1,jifen:1}).then(function (value) {
          console.log(value)
          if (!value[0].isVip && value[0].jifen >= 300){
            User.update({username:req.body.username}, {isVip:true,$inc:{jifen:-300}}).then(function (value2) {
              var errorCode=0,errorMessage=""
            })
            res.json({
              errorCode:0,
              errorMessage:""
            })
            return
          }else{
            if (value[0].isVip){
              var errorCode=-2,errorMessage="您已经是VIP，请勿重复开通"
            }else if(value[0].jifen < 300){
              var errorCode=-2,errorMessage="积分不足，再去多集一些赞吧"
            }
            res.json({
              errorCode:errorCode,
              errorMessage:errorMessage
            })
            return
          }
        })
      }else {
        var errorCode=10002,errorMessage="先去登录吧"
        res.json({
          errorCode:errorCode,
          errorMessage:errorMessage
        })
        return
      }

    }


    // res.json({
    //   errorCode:errorCode,
    //   errorMessage:errorMessage
    // })
  })


});

module.exports = router;
