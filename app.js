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
var logout = require('./routes/user/logout');
var getMyHome = require('./routes/user/getMyHome');
var getpublicKey = require('./routes/utils/getPublicKey');
var rsa = require('./routes/user/rsa');
var checkLogin = require('./routes/utils/checkLogin');
var getImg = require('./routes/utils/getImg');
var getDynamicList = require('./routes/review/getDynamicList');
var sendDynamic = require('./routes/review/sendDynamic');
var isLiked = require('./routes/review/isLiked');
var sendReview = require('./routes/review/sendReview');
var getMyHome = require('./routes/user/getMyHome');
var getReviewToMe = require('./routes/user/getReviewToMe');
var getMyAllDynamic = require('./routes/user/getMyAllDynamic');
var delDynamic = require('./routes/user/delDynamic');
var buyVip = require('./routes/user/buyVip');
var signIn = require('./routes/user/signIn');
var updataUserProverbs = require('./routes/user/updataUserProverbs');
var isWatch = require('./routes/user/isWatch');
var watching = require('./routes/user/watching');
var hideUserInfo = require('./routes/user/hideUserInfo');
var levelTask = require('./routes/user/levelTask');

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
app.use('/login', login);//登录接口
app.use('/logout', logout);//登出接口
app.use('/rsa', rsa);//加密接口
app.use('/getpublicKey', getpublicKey);//获取公钥
app.use('/checkLogin', checkLogin);//检查登录
app.use('/getimg', getImg);//检查登录
app.use('/getDynamicList', getDynamicList);//获取全部动态
app.use('/sendDynamic', sendDynamic);//发送动态
app.use('/isLiked', isLiked);//点赞
app.use('/sendReview', sendReview);//发送评论
app.use('/getMyHome', getMyHome);//获取我的信息
app.use('/getReviewToMe', getReviewToMe);//别人对我的评论
app.use('/getMyAllDynamic', getMyAllDynamic);//获取我的全部动态
app.use('/delDynamic', delDynamic);//删除我的动态
app.use('/buyVip', buyVip);//购买VIP
app.use('/signIn', signIn);//签到
app.use('/updataUserProverbs', updataUserProverbs);//修改个人信息
app.use('/hideUserInfo', hideUserInfo);//个人信息脱敏
app.use('/isWatch', isWatch);//获取关注列表
app.use('/watching', watching);//关注某人
levelTask.levelTask();//等级定时任务
levelTask.signIn();//签到定时任务

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
