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
      if (result){//有登录状态，按照点赞量返回精彩动态三条，并按照时间降序返回全部

        if (req.body.username){//返回给我的动态
          var timeRows = dynamic_list.find({"username":req.body.username}).sort({"time":-1}).limit().exec()
        }else{//返回给音乐圈动态
          var likeRows = dynamic_list.find({}).sort({"likenum":-1}).limit(3).exec()
          var timeRows = dynamic_list.find({}).sort({"time":-1}).exec()
        }

      }else{//没有登录，只按照时间降序排序
        var timeRows = dynamic_list.find({}).sort({"time":-1}).limit().exec();//时间排序

      };

    }

    Promise.all([timeRows,likeRows]).then(function (value) {
      res.json({
        errorCode:errorCode,
        errorMessage:errorMessage,
        likeRows:value[1],
        timeRows:value[0]
      })
    })

  })


});

module.exports = router;
