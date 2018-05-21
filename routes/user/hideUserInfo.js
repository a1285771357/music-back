var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = require('../../src/models/Users.js');
var session = require('express-session');
var fs = require('fs');
var path = require('path');
var redis = require('redis')
const moment = require('moment');
var redisClient = redis.createClient("6379", "127.0.0.1")


/* 加密个人信息 */
router.post('/', function(req, res, next) {

  redisClient.get("sess:"+req.sessionID,function (err,result) {//redis查询是否登录
    if (err){
      var errorCode=-1,errorMessage="服务器迷失了自我@a@"
    }else{
      var errorCode=0,errorMessage=""
      if (result){//有登录状态，按照点赞量返回精彩动态三条，并按照时间降序返回全部
        if (req.body.username && req.body.isEncrypt){
          var data = User.update({username:req.body.username},{isEncrypt:req.body.isEncrypt}).exec()
        }else {
          console.log(没有正确传参)
        }

      }else{//没有登录，只按照时间降序排序
        var errorCode = 10002, errorMessage="尚未登录，或者登录过期"
      };

    }

    // Promise.all([timeRows,likeRows,likedRecord]).then(function (value) {
    //   res.json({
    //     errorCode:errorCode,
    //     errorMessage:errorMessage,
    //     data:data
    //   })
    // })
    if (data){
      data.then(function (value) {
        // console.log("我的信息"+JSON.stringify(value))
        res.json({
          errorCode:errorCode,
          errorMessage:errorMessage
        })
      })
    }else {
      res.json({
        errorCode:errorCode,
        errorMessage:errorMessage
      })
    }



  })


});

module.exports = router;
