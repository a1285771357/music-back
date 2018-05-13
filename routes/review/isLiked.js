var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var liked_record = require('../../src/models/liked_record');
var dynamic_list = require('../../src/models/dynamic_list');
var session = require('express-session');
var fs = require('fs');
var path = require('path');
var redis = require('redis')
const moment = require('moment');
var redisClient = redis.createClient("6379", "127.0.0.1")



/* GET login page. */
router.post('/', function(req, res, next) {

  redisClient.get("sess:"+req.sessionID,function (err,result) {//redis查询是否登录
    if (err){
      var errorCode=-1,errorMessage="服务器迷失了自我@a@"
    }else{
      var errorCode=0,errorMessage=""
      if (result){//有登录状态
        if (!req.body.id && !req.body.username){//必传字段不能为空
          return
        }
        //有username插入，有没创建。禁止数组重复插入
        liked_record.findOneAndUpdate({username:req.body.username},{'$addToSet': {recordarr:req.body.id}},{upsert:true}).exec().then(function (value) {
          if (!err){
            var errorCode = 0,
            errorMessage = ""
          }
        })
        dynamic_list.findByIdAndUpdate(req.body.id,{$inc:{likenum:1}}).exec().then(function (value) { console.log(value) })

      }else{//没有登录
        var errorCode=-2,errorMessage="您尚未登录，或者登录已过期"//时间排序

      };

    }
    res.json({
       errorCode:errorCode,
       errorMessage:errorMessage
     })
    // if (data){
    //   data.then(function (value) {
    //     res.json({
    //       errorCode:errorCode,
    //       errorMessage:errorMessage,
    //       liked:value.liked,
    //       likenum : value.likenum
    //     })
    //   })
    //   return
    // }else{
    //   res.json({
    //     errorCode:errorCode,
    //     errorMessage:errorMessage
    //   })
    // }


  })


});

module.exports = router;
