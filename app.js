let express = require('express');
let path = require('path');
// let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let lessMiddleware = require('less-middleware');
let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('x-powered-by', 'Changeden.net');
    next();
});
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/users'));
app.use('/app', require('./routes/apps'));
app.use('/class', require('./routes/classes'));
app.use('/object', require('./routes/objects'));
app.use('/command', require('./routes/command'));
app.use('/email', require('./routes/email'));

function onError(req, code, zh, en) {
    return {
        code: code,
        message: {
            Chinese: zh,
            English: en
        },
        result: {
            path: req.path,
            query: req.query,
            body: req.body
        }
    };
}

// catch 404 and forward to error handler
app.use(function (req, res) {
    let code = 404;
    res.status(code);
    res.jsonp(onError(req, code, '我们至今没有公开该Api。', 'Api is not defined.'));
});
// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    let code = err.status || 500;
    res.status(code);
    //res.render('error');
    res.jsonp(onError(req, code, '真是惊喜，让我有些始料未及。', 'This is a surprise.'));
});
global.memory = {};
module.exports = app;
