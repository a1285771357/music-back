var express = require('express');
var fs = require('fs');
var type = require('mime')
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//
//     res.setHeader("Access-Control-Allow-Origin","*");
//     /*星号表示所有的异域请求都可以接受，*/
//     res.setHeader("Access-Control-Allow-Methods","GET,POST");
//     console.log(111)
//     // res.send('respond with a resource');
//     res.json({name:'张雷'})
// });
/*读取文件*/
// var path = 'D:\CloudMusic\李袁杰 - 离人愁.mp3'
// fs.readdir('../CloudMusic',function (err, files) {
//     console.log(files)
// })
// console.log(type._extensions.audio)
// fs.readFile('../../CloudMusic/李袁杰 - 离人愁.mp3',type._extensions, function (err, data) {
//     console.log(data)
// })
// console.log(process.cwd())
module.exports = router;