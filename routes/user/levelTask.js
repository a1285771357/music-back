var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../../src/models/Users")
var schedule = require('node-schedule');

/*封装定时任务，每个月1号等级提升*/
var scheduleCronstyle =  function (){
  this.levelTask = function () {
    schedule.scheduleJob('0 0 0 1 * *', function(){

      User.update({},{$inc:{"level":1}},{multi:true}).then(function (value) { console.log(value) })
      console.log("等级更新啦")
    });
  }
  this.signIn = function () {
    schedule.scheduleJob('0 30 0 * * *', function(){
      User.update({},{signIn:false},{multi:true}).then(function (value) { console.log(value) })
    }) ;
  }
}


module.exports = new scheduleCronstyle;
