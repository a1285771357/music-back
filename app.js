var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require("cors")

/*引入模块cookie、session、redis*/
var session = require('express-session');
// var cookieParser = require('cookie-parser');
var redis = require('redis')
var redisClient = redis.createClient("6379", "127.0.0.1")
var RedisStore = require('connect-redis')(session);



/*配置路由接口*/
var index = require('./routes/index');
var users = require('./routes/users');
var serchfile = require('./routes/serchfile');
var myTotalIncome = require('./routes/myTotalIncome');
var login = require('./routes/user/login');
var getpublicKey = require('./routes/utils/getPublicKey');
var rsa = require('./routes/user/rsa');
var checkLogin = require('./routes/utils/checkLogin');
var getImg = require('./routes/utils/getImg');
var getDynamicList = require('./routes/review/getDynamicList');
var sendDynamic = require('./routes/review/sendDynamic');
var isLiked = require('./routes/review/isLiked');

var app = express();

/*应用session*/
// app.use(cookieParser('password'));

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000', // web前端服务器地址
}))

app.use(session({
  store: new RedisStore({client: redisClient}),
  name:"SESSIONID",
  resave:false,// 是否每次都重新保存会话，建议false
  saveUninitialized: false,// 是否自动保存未初始化的会话，建议false
  secret: "password",// 用来对session id相关的cookie进行签名
  cookie: {
    maxAge: 60 * 1000 * 10, // 有效期10min，单位是毫秒
    httpOnly:false
  }
}));

app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('oh no')) // handle error
  }
  next() // otherwise continue
})

// view engine setup模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//对应后端routes文件路由
app.use('/', index);
app.use('/users', users);
app.use('/serchfile',serchfile);
app.use('/mimosa/client/investor/baseaccount/myTotalIncome', myTotalIncome);
app.use('/login', login);//登陆接口
app.use('/rsa', rsa);//加密接口
app.use('/getpublicKey', getpublicKey);//获取公钥
app.use('/checkLogin', checkLogin);//检查登录
app.use('/getimg', getImg);//检查登录
app.use('/getDynamicList', getDynamicList);//获取全部动态
app.use('/sendDynamic', sendDynamic);//发送动态
app.use('/isLiked', isLiked);//点赞

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
