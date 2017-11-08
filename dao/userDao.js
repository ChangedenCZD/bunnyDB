let {DbUtils, ResUtils, TextUtils, UUIDUtils, Md5, Sha256, RedisUtils, RegUtils} = require('../utils/Utils');
let Keys = require('../secret/keys.json');

function genCheck(account) {
    return `select count(*) count from user where account = '${account}' and status = 1`;
}

function genUserId(account, cb) {
    const baseString = `${UUIDUtils.v4()}${UUIDUtils._v4()}${account}${new Date()}${Math.random()}${UUIDUtils.v1()}${ UUIDUtils._v1()}`;
    const userid = `${parseInt(TextUtils.stringToInt(baseString) * (account.length + Math.random() * 44))}`;
    DbUtils.client().query(`select count(*) count from user where id='${userid}'`, [], (err, result) => {
        if (err) {
            cb(userid);
        } else {
            if (result[0].count < 1) {
                cb(userid);
            } else {
                genUserId(account, cb);
            }
        }
    });
}

/**验证账号有效性*/
function check(req, res) {
    let account = req.params.account;
    if (account) {
        DbUtils.client().query(genCheck(account), true, (err, result) => {
            if (err) {
                ResUtils.dbError(res, err, req);
            } else {
                ResUtils.success(res, '验证成功', {
                    account: account,
                    valid: result[0].count < 1
                }, req);
            }
        });
    } else {
        ResUtils.error(res, '用户名不能为空', null, {
            request: {
                method: 'GET',
                params: ['/user/{account}']
            }
        }, req);
    }
}

/**注册*/
function signUp(req, res) {
    let body = req.body;
    let account = body.account;
    let password = body.password;
    let email = body.email;
    let verificationCode = body.verificationCode;
    let message = '';
    if (!(TextUtils.checkLength(account, 8, 77) && RegUtils.test(account, RegUtils.REG.NUMBER_AND_ALPHABET_CHINESE))) {
        message = '用户名应由8~77位字符（数字、字母、汉字）组成';
    } else if (!(TextUtils.checkLength(password, 8, 100) && RegUtils.test(account, RegUtils.REG.NUMBER_AND_ALPHABET))) {
        message = '密码应由8~100位字符（数字、字母）组成';
    } else if (!RegUtils.test(email, RegUtils.REG.EMAIL)) {
        message = '请输入正确的邮箱';
    } else if (!TextUtils.checkLength(verificationCode, 3, 10)) {
        message = '请输入正确的验证码';
    } else {
        let md5 = Md5(account + email);
        RedisUtils.get(md5, (err, value) => {
            RedisUtils.remove(md5);
            if (err || !value || verificationCode !== value) {
                ResUtils.error(res, '验证码错误', null, body, req);
            } else {
                const client = DbUtils.client();
                client.query(genCheck(account), true, (err, result) => {
                    if (err) {
                        ResUtils.dbError(res, err, req);
                    } else {
                        const valid = result[0].count < 1;
                        if (valid) {
                            genUserId(account, (userId) => {
                                const sql = `insert into user(id,account,password,email) values('${userId}','${account}','${Md5(Keys.DEFAULT_KEY + password)}','${email}')`;
                                client.query(sql, [], (err, result) => {
                                    if (err) {
                                        ResUtils.dbError(res, err, req);
                                    } else {
                                        if (result.affectedRows) {
                                            ResUtils.success(res, '注册成功', {
                                                account: account,
                                                userId: userId
                                            }, req);
                                        } else {
                                            ResUtils.error(res, '注册失败', null, {
                                                account: account
                                            }, req);
                                        }
                                    }
                                });
                            });
                        } else {
                            ResUtils.error(res, '该账号已被占用', null, {
                                account: account
                            }, req);
                        }
                    }
                });
            }
        });
    }
    if (message) {
        ResUtils.error(res, message, null, {
            account: account,
            request: {
                method: 'PUT',
                body: ['account', 'password']
            }
        }, req);
    }
}

/**登录*/
function signIn(req, res) {
    let body = req.body;
    let account = body.account;
    let password = body.password;
    let message = '';
    if (!TextUtils.checkLength(account, 8, 77)) {
        message = '用户名应由8~77位字符组成';
    } else if (!TextUtils.checkLength(password, 8, 100)) {
        message = '密码应由8~100位字符组成';
    } else {
        const client = DbUtils.client();
        client.query(genCheck(account), true, (err, result) => {
            if (err) {
                ResUtils.dbError(res, err, req);
            } else {
                const valid = result[0].count > 0; // 如果存在账号
                if (valid) {
                    const sql = `select id userId,account,createAt,updateAt from user where account='${account}' and password='${Md5(Keys.DEFAULT_KEY + password)}' and status=1 order by updateAt desc limit 1`;
                    client.query(sql, true, (err, result) => {
                        if (err) {
                            ResUtils.dbError(res, err, req);
                        } else {
                            if (result.length) {
                                const user = result[0];
                                const baseToken = `${Keys.HEADER_TOKEN}_${JSON.stringify(user)}_${new Date().getTime()}`;
                                const accessToken = Sha256.x2(baseToken);
                                const supportKey = `${Keys.HEADER_TOKEN}_${user.userId}`; // 用于单点登录
                                RedisUtils.get(supportKey, (err, redisResult) => {
                                    if (!err && redisResult) {
                                        RedisUtils.remove(redisResult);
                                    }
                                });
                                RedisUtils.set(accessToken, user.userId, 86400 * 7);
                                RedisUtils.set(supportKey, accessToken, 86400 * 7);
                                ResUtils.success(res, '登录成功', {
                                    user: user,
                                    accessToken: accessToken
                                }, req);
                            } else {
                                ResUtils.error(res, '账号或密码错误', null, {
                                    account: account,
                                    request: {
                                        method: 'POST',
                                        body: ['account', 'password']
                                    }
                                }, req);
                            }
                        }
                    });
                } else {
                    ResUtils.error(res, '账号不存在', null, {
                        account: account,
                        request: {
                            method: 'POST',
                            body: ['account', 'password']
                        }
                    }, req);
                }
            }
        });
    }
    if (message) {
        ResUtils.error(res, message, null, {
            account: account,
            request: {
                method: 'POST',
                body: ['account', 'password']
            }
        }, req);
    }
}

module.exports = {
    check: check,
    signUp: signUp,
    signIn: signIn
};