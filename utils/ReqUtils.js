const RedisUtils = require('./RedisUtils');
const DbUtils = require('./DbUtils');
let Keys = require('../secret/keys.json');

function checkToken(req, cb) {
    const token = req.header(Keys.HEADER_TOKEN);
    if (token) {
        RedisUtils.get(token, (err, redisResult) => {
            if (err || !redisResult) {
                cb && cb(false);
            } else {
                cb && cb(true, redisResult);
            }
        });
    } else {
        cb && cb(false);
    }
}

module.exports = {
    checkToken: checkToken
};