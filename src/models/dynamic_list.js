//创建一个模型，就是一个实体类,具有数据库操作的能力
var mongoose = require("mongoose");
var dynamic_list = require("../schemas/dynamic_list");
var dynamic_list = mongoose.model("dynamic_list",dynamic_list);


module.exports = dynamic_list;