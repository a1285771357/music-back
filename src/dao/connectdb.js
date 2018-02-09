//链接数据库
var mongoose = required("mongoose");
var url = 'mongodb://localhost:27017/zl';

//链接
mongoose.connect(url);

//连接成功
mongoose.connection.on('connected',function (err){
    if (err){
        console.log("数据库连接失败")
    }
    console.log("数据库连接成功")
})