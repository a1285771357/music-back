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
    }
})

module.exports = Users;

