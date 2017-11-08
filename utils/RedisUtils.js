/**
 * Created by changeden on 2017/7/18.
 * Redis 工具类
 */
const redis = require('redis');

function redisClient() {
    return redis.createClient();
}

function set(key, value, expire) {
    let client = redisClient();
    expire = expire || 86400;
    let gRedis = memory();
    gRedis[key] = {
        value: value,
        expire: new Date().getTime() + expire * 1000
    };
    client.set(key, JSON.stringify(value) || '', 'EX', parseInt(expire + 1));
}

function get(key, cb) {
    let gRedis = memory();
    let value;
    if (gRedis.hasOwnProperty(key)) {
        let mem = gRedis[key] || '{}';
        value = mem.value;
        let expire = mem.expire;
        if (new Date().getTime() <= expire) { // 不过期
            if (value !== false) {
                value = value || null;
            }
        } else {
            value = null;
        }
    }
    if (value === null || typeof(value) === 'undefined') {
        delete gRedis[key];
        let client = redisClient();
        client.get(key, (err, value) => {
            value = JSON.parse(value) || null;
            cb && cb(err, value);
        });
    } else {
        cb && cb(null, value);
    }
}

function remove(key) {
    set(key, null, 1);
}

function memory() {
    return global.memory.redis = global.memory.redis || {};
}

module.exports = {
    set: set,
    get: get,
    remove: remove,
    redisClient: redisClient
};