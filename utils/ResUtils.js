/**
 * Created by Changeden on 2017/7/18.
 * 接口响应工具类
 */
function resObj(code, message, result, req) {
    let time = new Date().getTime();
    const res = {
        code: code,
        message: message,
        timeStamp: time,
        startTime: req ? req._startTime.getTime() : time
    };
    if (result) {
        res.result = result;
    }
    return res;
}

function success(res, message, result, req) {
    res.json(resObj(0, message, result, req));
}

function error(res, message, code, result, req) {
    res.json(resObj(code || -1, message, result, req));
}

function dbError(res, dbError, req) {
    console.error(dbError.sqlMessage);
    res.json(resObj(-4, '服务器异常', {
        error: dbError.sqlMessage
    }, req));
}

function unauthorized(res, req) {
    res.statusCode = 401;
    res.json(resObj(401, '登录已过期', null, req));
}

module.exports = {
    success: success,
    error: error,
    dbError: dbError,
    unauthorized: unauthorized
};