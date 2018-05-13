var express = require('express');
var router = express.Router();
var session = require('express-session');
var redis = require('redis')
var redisClient = redis.createClient("6379", "127.0.0.1")

router.post('/', function(req, res, next) {
  redisClient.get("sess:"+req.sessionID,function (err,result) {//redis查询是否登录
    if (result){//有登录状态，按照点赞量返回精彩动态三条，并按照时间降序返回全部
      var errorCode=0
    }else{//没有登录，只按照时间降序排序
      var errorCode=-1
    }
    res.json({
        errorCode:errorCode
      })
  })

});

module.exports = router;
