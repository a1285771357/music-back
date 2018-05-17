var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var session = require('express-session');
var fs = require('fs');
var path = require('path');
var redis = require('redis')
var redisClient = redis.createClient("6379", "127.0.0.1")

/* GET logout page. */
router.post('/', function(req, res, next) {

  redisClient.del("sess:"+req.sessionID,function (err,result) {//redis查询是否登录
    if (err){
      var errorCode=-1,errorMessage="服务器迷失了自我@a@"
    }else{
      var errorCode=0,errorMessage=""
      console.log(result)
    }


    res.json({
      errorCode:errorCode,
      errorMessage:errorMessage
    })

  })


});

module.exports = router;
