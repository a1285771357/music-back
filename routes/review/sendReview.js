var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
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
        if (!req.body.id || !req.body.username || !req.body.reviewcontents){//必传字段不能为空
          return
        }
        var content =new dynamic_list({
          username: req.body.username,
          reviewcontents:req.body.reviewcontents
        })
        // console.log("客户端数据"+JSON.stringify(req.body.reviewcontents))
        dynamic_list.findByIdAndUpdate(req.body.id,{"$push":{reviewdata:{username: req.body.username,reviewcontents:req.body.reviewcontents }}}).exec()
        var data = dynamic_list.findByIdAndUpdate(req.body.id,{$inc:{reviewsnum:1}}).exec()
      }else{//没有登录
        var errorCode=-2,errorMessage="您尚未登录，或者登录已过期"//时间排序

      };

    }
    if (data){

      data.then(function (value) {
        console.log(value)
        res.json({
          errorCode:errorCode,
          errorMessage:errorMessage
        })
      })
      return
    }else{
      res.json({
        errorCode:errorCode,
        errorMessage:errorMessage
      })
    }
    // res.json({
    //   errorCode:errorCode,
    //   errorMessage:errorMessage
    // })


  })


});

module.exports = router;
