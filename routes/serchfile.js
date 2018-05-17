var express = require('express');
var fs = require('fs');
var path = require('path');
var meimeType = require('mime')
var router = express.Router();

var musicPaht = path.join(__dirname, '../music/李袁杰 - 离人愁.mp3')
console.log(musicPaht)
var mp3 = meimeType._types.mp3
router.get('/', function(req, res, next) {
    // res.json({
    //     name:'adfdsfa'
    // })
    //     res.setHeader("Access-Control-Allow-Origin","*");
    // /*星号表示所有的异域请求都可以接受，*/
    // res.setHeader("Access-Control-Allow-Methods","GET,POST");
    res.set( 'content-type', 'audio/mp3' );//设置返回类型
    var stream = fs.createReadStream( musicPaht );
    var responseData = [];//存储文件流
    if (stream) {//判断状态
        stream.on( 'data', function( chunk ) {
            responseData.push( chunk );
        });
        stream.on( 'end', function() {
            var finalData = Buffer.concat( responseData );
            res.write( finalData );
            res.end();
        });
    }
    /*读取文件*/
    // fs.readFile('name.txt','utf-8', function(err, data){
    //     console.log(data)
    // })
})

/* GET users listing. */
// router.get('/', function(req, res, next) {
//
//     res.setHeader("Access-Control-Allow-Origin","*");
//     /*星号表示所有的异域请求都可以接受，*/
//     res.setHeader("Access-Control-Allow-Methods","GET,POST");
//     console.log(111)
//     var filedir = path.join(__dirname , 'name.txt');
//     fs.stat(filedir, function (err, stats) {
//         if (err){
//             console.log(err)
//         }else{
//             var isFile = stats.isFile()
//             if (isFile){
//                 var content = fs.readFile(filedir,'UTF-8');
//                 console.log(filedir)
//                 console.log(content)
//             }
//             console.log(stats)
//         }
//     })
//     // res.send('respond with a resource');
//     // res.json({url:'./李袁杰 - 离人愁.mp3'})
// });
/*读取文件*/
// var path = 'D:\CloudMusic\李袁杰 - 离人愁.mp3'
// fs.readFile('./name.txt',function (err, data) {
//     console.log(data)
// })
// console.log(type._extensions.audio)
// fs.readFile('../../CloudMusic/李袁杰 - 离人愁.mp3',type._extensions, function (err, data) {
//     console.log(data)
// })
// console.log(process.cwd())
// fs.readFile('./users.js',function (err, data) {
//     console.log(data)
// })

module.exports = router;