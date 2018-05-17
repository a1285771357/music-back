//创建一个模型，就是一个实体类,具有数据库操作的能力
var mongoose = require("mongoose");
var fan = require("../schemas/fan");
var fan = mongoose.model("fan",fan);


module.exports = fan;