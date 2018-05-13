//实例化用户表,每一个Schema对应MongoDB中的一个集合collection，Schema中定义了集合中文档document的样式
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var liked_record = new Schema({
  username: {
    type: String,
    require: true
  },
  recordarr:{
    type:Array,
    require:true
  }
})

module.exports = liked_record;

