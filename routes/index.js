var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = require('../src/models/Users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  //保存数据
  /*
  var user = new User({
      name:'zhanglei',
      password:'zhanglei'
  });
  user.save(function (err,result) {
    if (err){
        console.log('db status:failed')
        return
    }else{
      console.log("存储成功"+result)
    }

  })
  */
    /**设置响应头允许ajax跨域访问**/
    res.setHeader("Access-Control-Allow-Origin","*");
    /*星号表示所有的异域请求都可以接受，*/
    res.setHeader("Access-Control-Allow-Methods","GET,POST");
  console.log("客户端数据"+req.query)
    User.findOne({
        name : req.query.name
    },function (err,docs) {
        console.log("查询数据库结果为："+docs)
        if (err){
          console.log(err)
          // res.send("server or db error")

        }else if(docs){
          if(docs.password == req.query.password){
              console.log("登录成功："+docs);
              res.json({
                  "name": docs.name
              })
              // res.render('index', { title: req.query.name });
          }else{
            console.log("密码错误")
              res.json({
                  "err": "密码错误"
              })
              // res.render('index',{title:"密码错误"})
          }

            // res.render("欢迎")

        }else {
            console.log("不存在该用户")
        }
    })


});

module.exports = router;
