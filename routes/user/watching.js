var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var fan = require('../../src/models/fan');
var session = require('express-session');
var fs = require('fs');
var path = require('path');
var redis = require('redis')
const moment = require('moment');
var redisClient = redis.createClient("6379", "127.0.0.1")


/* 关注某人 */
router.post('/', function(req, res, next) {

  redisClient.get("sess:"+req.sessionID,function (err,result) {//redis查询是否登录
    if (err){
      var errorCode=-1,errorMessage="服务器迷失了自我@a@"
    }else{
      var errorCode=0,errorMessage=""
      if (result){//有登录状态，按照点赞量返回精彩动态三条，并按照时间降序返回全部
        //username:登录的用户，watchedname:被关注人的名字
        if (req.body.username && req.body.watchedname){
          //$addToSet避免重复插入
          //向登录用户的关注列表插入新关注的人
          var data = fan.update({username:req.body.username},{'$addToSet':{watch:req.body.watchedname}}).exec()
          //向关注人的粉丝列表插入新粉丝
          var data1 = fan.update({username:req.body.watchedname},{'$addToSet':{fans:req.body.username}}).exec()
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
        console.log("更新粉丝，关注"+JSON.stringify(value))
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
