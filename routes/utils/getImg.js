var express = require('express');
var fs = require('fs');
var path = require('path');
var meimeType = require('mime')
var router = express.Router();



var mp3 = meimeType._types.mp3
router.get('/', function(req, res, next) {
  console.log(req.query)
  var imgPath = path.join(__dirname, req.query.path)
  var stream = fs.createReadStream(imgPath);
  var responseData = [];//存储文件流
  if (stream) {//判断状态
    stream.on('data', function (chunk) {
      responseData.push(chunk);
    });
    stream.on('end', function () {
      var finalData = Buffer.concat(responseData);
      res.write(finalData);
      res.end();
    });
  }
})

module.exports = router;