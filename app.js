



let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let log4js = require('./lib/log4js').getLogger('APP');
let mongoose  = require('mongoose');
let errHandler = require('./lib/err-handler');
let redisClient = require('./lib/redis');


// 投票服务
let baseRouter = require('./routes/base-router');

//平台服务
let platRouter = require('./routes/plat-router');



let appConfig = require('./config/config');
let bizUtils = require('./lib/biz-utils');

let app = express();

// 配置开发环境，端口等
process.env.ENV = appConfig.evn;
process.env.PORT = appConfig.port;
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// 中间件
app.use(function(req, res, next) {
    if(req.url == "/favicon.ico") {
        return;
    }
    // 不需要验证token的页面 注册接口和投票页面
    if(req.url.includes("/openapi/main")  || 
    req.url.includes("/js") || 
    req.url.includes("/css") || 
    req.url.includes("/openapi/register") || 
    req.url.startsWith('/openapi/plat') ||
    req.url.startsWith('/openapi/plat/platlogin')
  ) {
       next()
    }else {
        let {token} = bizUtils.extend(req.body,req.query);
        
        let cacheKey = token.split('.')[0];
        let cacheResult = redisClient.get(cacheKey);
        console.log('redis:::', redisClient.get(cacheKey))
        if(cacheResult) {
            let result = bizUtils.validToken(token);
            console.log(result,"jjjtoken")
            req.email = result.email;
            next();
        } else {
            //如果token认证失败则直接返回token错误信息 这个功能应该还有登录功能 由于时间关系没写
            errHandler.TokenError(res);
        }
    }
   
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
    // 设置缓存7天
    maxAge: 604800000
}));
mongoose.connect("'mongodb://localhost:27017/vote",{ useNewUrlParser: true });

// 中间件，为所有请求记录日志
app.use(function(req, res, next) {
    log4js.info(req.url);
    next();
});

// toupiao
app.use('/openapi', baseRouter);

// 平台服务
app.use('/openapi/plat', platRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (appConfig.evn === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.send(err);
//     });
// }

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    log4js.error('APP SYSTEM ERROR:' + err);
    res.status(err.status || 500);
    res.send({
        rsp_code: 'fail',
        error_code: 'system error',
        error_msg: '系统错误'
    });
});



module.exports = app;
