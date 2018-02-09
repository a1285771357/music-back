//创建一个模型，就是一个实体类,具有数据库操作的能力
var mongoose = require("mongoose");
var Users = require("../schemas/Users.js");
var User = mongoose.model("user",Users);

module.exports = User;