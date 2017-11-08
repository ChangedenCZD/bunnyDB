/**
 * Created by Changeden on 2017/7/18.
 * 数据库工具类
 */
const mysql = require('mysql');
const config = require('../secret/db.json');
let lastTime = time();
let lastClient = createClient();
/**
 * 连接数据库
 * */
const client = () => {
    if (needToUpdate()) {
        lastClient = createClient();
    }
    return lastClient;
};

function createClient() {
    return mysql.createConnection({
        host: config.bunnyDB.host.remote,
        user: config.bunnyDB.admin.account,
        password: config.bunnyDB.admin.password,
        database: config.bunnyDB.name,
        multipleStatements: true
    });
}

function time() {
    return new Date().getTime();
}

function needToUpdate() {
    let isUpdate = (time() - 4444) >= lastTime;
    if (isUpdate) {
        lastTime = time();
    }
    return isUpdate;
}

module.exports = mysql;
module.exports.client = client;