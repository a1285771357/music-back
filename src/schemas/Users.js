//实例化用户表,每一个Schema对应MongoDB中的一个集合collection，Schema中定义了集合中文档document的样式
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Users = new Schema({
    name: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    fansnum : {
      type:Number,
      require:true,
      default:0
    },
    sex : {
      type:String,
      require:true,
      default:"male"
    },
    level : {
      type:Number,
      require:true,
      default:1
    },
    isVip : {
      type:Boolean,
      default:false,
      require:true
    },
    isEncrypt : {
      type:Boolean,
      default:false,
      require:true
    },
    jifen : {
      type:Number,
      default:0,
      require:true
    },
    watchnum : {
      type:Number,
      default:0,
      require:true
    },
    proverbs : {
      type:String,
      require:true,
      default:"还没有个人简介呢~~"
    },
    endDate : {
      type:Date,
      require:true
    },
    signIn : {
      type:Boolean,
      default:false,
      require:true
    }
})

module.exports = Users;

