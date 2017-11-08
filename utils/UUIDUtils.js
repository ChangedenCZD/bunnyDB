/**
 * Created by Changeden on 2017/7/18.
 * uuid工具类
 */
const UUID = require('uuid');

function _v1() {
    return UUID.v1().toString();
}

function v1() {
    return _v1().replace(/-/g, '');
}

function _v4() {
    return UUID.v4().toString();
}

function v4() {
    return _v4().replace(/-/g, '');
}

module.exports = {
    _v1: _v1,
    v1: v1,
    _v4: _v4,
    v4: v4
};