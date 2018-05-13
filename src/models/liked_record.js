var mongoose = require("mongoose");
var liked_record = require("../schemas/liked_record");
var liked_record = mongoose.model("liked_record",liked_record);

module.exports = liked_record;