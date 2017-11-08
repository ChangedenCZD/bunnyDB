let {DbUtils, ResUtils, ReqUtils, TextUtils, UUIDUtils, Md5, Sha256, DateUtils, RegUtils} = require('../utils/Utils');

function genCheck(userId, appName) {
    return `select count(*) count from big_data_application where creatorId='${userId}' and name='${appName}'`;
}

function list(req, res) {
    ReqUtils.checkToken(req, (success, userId) => {
        if (success && userId) {
            const sql = `select * from big_data_application where creatorId='${userId}'`;
            DbUtils.client().query(sql, [], (err, result) => {
                if (err) {
                    ResUtils.dbError(res, err, req);
                } else {
                    ResUtils.success(res, '请求成功', {userId: userId, list: result}, req);
                }
            });
        } else {
            ResUtils.unauthorized(res, req);
        }
    });
}

function get(req, res) {
    const appId = req.params.appId;
    if (!TextUtils.checkLength(appId, 1, 50)) {
        ResUtils.error(res, 'appId不能为空', null, null, req);
    } else {
        ReqUtils.checkToken(req, (success, userId) => {
            if (success && userId) {
                let sql = `select * from big_data_application where creatorId='${userId}' and appId='${appId}'`;
                DbUtils.client().query(sql, [], (err, result) => {
                    if (err) {
                        ResUtils.dbError(res, err, req);
                    } else if (result.length < 1) {
                        ResUtils.error(res, '应用不存在', null, {userId: userId, appId: appId}, req);
                    } else {
                        ResUtils.success(res, '请求成功', {userId: userId, application: result[0]}, req);
                    }
                });
            } else {
                ResUtils.unauthorized(res, req);
            }
        });
    }
}

function add(req, res) {
    const body = req.body;
    const appName = body.appName;
    if (!(TextUtils.checkLength(appName, 1, 50) && RegUtils.test(appName, RegUtils.REG.NUMBER_AND_ALPHABET_CHINESE))) {
        ResUtils.error(res, '应用名由1~50个字符（数字、字母、汉字）组成', null, body, req);
    } else {
        const client = DbUtils.client();
        ReqUtils.checkToken(req, (success, userId) => {
            if (success && userId) {
                client.query(genCheck(userId, appName), [], (err, result) => {
                    if (err) {
                        ResUtils.dbError(res, err, req);
                    } else if (result[0].count > 0) {
                        ResUtils.error(res, `您已创建过名为~${appName}~的应用了`, null, body, req);
                    } else {
                        const appId = UUIDUtils.v4();
                        const appKey = Md5(appId);
                        const appSecret = Sha256.x2(appId + appKey + new Date().getTime());
                        const insertSql = `insert into big_data_application(appId,name,appKey,appSecret,creatorId) values(?,?,?,?,?)`;
                        client.query(insertSql, [appId, appName, appKey, appSecret, userId], (err, result) => {
                            if (err && result.affectedRows < 1) {
                                ResUtils.dbError(res, err, req);
                            } else {
                                ResUtils.success(res, '应用创建成功', {
                                    userId: userId,
                                    application: {
                                        appId: appId,
                                        appName: appName,
                                        appKey: appKey,
                                        appSecret: appSecret
                                    }
                                }, req);
                            }
                        });
                    }
                });
            } else {
                ResUtils.unauthorized(res, req);
            }
        });
    }
}

function updateApp(req, res, appId, key, value) {
    let sql = `update big_data_application set ${key}='${value}',updateAt='${DateUtils.format(new Date(), 'yyyy-mm-dd HH:MM:ss')}' where appId='${appId}'`;
    DbUtils.client().query(sql, [], (err, result) => {
        if (err || !(result && result.changedRows)) {
            ResUtils.dbError(res, err || {sqlMessage: '应用不存在'}, req);
        } else {
            ResUtils.success(res, '应用更新成功', {
                appId: appId
            });
        }
    });
}

function update(req, res) {
    const appId = req.params.appId;
    const body = req.body;
    const appName = body.appName;
    const updateAppName = !(typeof(appName) === 'undefined');
    if (!TextUtils.checkLength(appId, 1, 50)) {
        ResUtils.error(res, 'appId不能为空', null, null, req);
    } else if (updateAppName && !(TextUtils.checkLength(appName, 1, 50) && RegUtils.test(appName, RegUtils.REG.NUMBER_AND_ALPHABET_CHINESE))) {
        ResUtils.error(res, '应用名由1~50个字符（数字、字母、汉字）组成', null, body, req);
    } else {
        ReqUtils.checkToken(req, (success, userId) => {
            if (success && userId) {
                if (updateAppName) { // 如果需要更新名字，则先检测是否已存在
                    DbUtils.client().query(genCheck(userId, appName), [], (err, result) => {
                        if (err) {
                            ResUtils.dbError(res, err, req);
                        } else if (result[0].count > 0) {
                            ResUtils.error(res, `您已创建过名为~${appName}~的应用了`, null, body, req);
                        } else {
                            updateApp(req, res, appId, 'name', appName);
                        }
                    });
                } else if (body.appSecret === true) {
                    const appSecret = Sha256.x2(appId + Md5(appId) + new Date().getTime());
                    updateApp(req, res, appId, 'appSecret', appSecret);
                } else {
                    ResUtils.success(res, '应用更新成功', body, req);
                }
            } else {
                ResUtils.unauthorized(res, req);
            }
        });
    }
}

function deleteApp(req, res) {
    const appId = req.params.appId;
    if (!TextUtils.checkLength(appId, 1, 50)) {
        ResUtils.error(res, 'appId不能为空', null, null, req);
    } else {
        ReqUtils.checkToken(req, (success, userId) => {
            if (success && userId) {
                let sql = `delimiter//
                DROP PROCEDURE IF EXISTS procDelete;
                CREATE PROCEDURE procDelete (aId varchar(36),cId varchar(36))
                BEGIN
                    DECLARE classArr TEXT DEFAULT NULL;
                    DECLARE classLen INT DEFAULT 0;
                    DECLARE classIdx INT DEFAULT 1;
                    DECLARE classId TEXT DEFAULT '';
                    DECLARE realClassId TEXT DEFAULT NULL;
                    DECLARE appDeleteSql TEXT DEFAULT 'delete from big_data_application where appId="';
                    DECLARE classDeleteSql TEXT DEFAULT 'delete from big_data_class where appId="';
                    DECLARE objectDeleteSql TEXT DEFAULT 'delete from big_data_object where ';
                
                    SET appDeleteSql = CONCAT(appDeleteSql, aId,'" and creatorId="',cId,'";');
                    SET classDeleteSql = CONCAT(classDeleteSql, aId,'" and creatorId="',cId,'";');
                
                    SELECT GROUP_CONCAT(distinct id) INTO classArr from big_data_class where appId=aId and creatorId=cId;
                    SET classLen = (length(classArr)-length(replace(classArr,',',''))+1);
                    WHILE classIdx <= classLen DO
                        SELECT REVERSE(SUBSTRING_INDEX(REVERSE(SUBSTRING_INDEX(classArr, ",", classIdx)), ",", 1)) into realClassId;
                        SET objectDeleteSql = CONCAT(objectDeleteSql,'classId="',realClassId,'" or');
                        SET classIdx = classIdx+1;
                    END WHILE;
                    SET objectDeleteSql = CONCAT(SUBSTRING(objectDeleteSql,1, length(objectDeleteSql)-2), ';');
                    SET @appDeleteSql = appDeleteSql;
                    PREPARE pAppDeleteSql FROM @appDeleteSql;
                    EXECUTE pAppDeleteSql;
                    SET @classDeleteSql = classDeleteSql;
                    PREPARE pClassDeleteSql FROM @classDeleteSql;
                    EXECUTE pClassDeleteSql;
                    SET @objectDeleteSql = objectDeleteSql;
                    PREPARE pObjectDeleteSql FROM @objectDeleteSql;
                    EXECUTE pObjectDeleteSql;
                END//
                delimiter;
                CALL procDelete('${appId}','${userId}');
                DROP PROCEDURE IF EXISTS procDelete;`;
                DbUtils.client().query(sql, [], (err, result) => {
                    if (err) {
                        ResUtils.dbError(res, err, req);
                    } else {
                        ResUtils.success(res, '应用删除成功', {userId: userId, appId: appId}, req);
                    }
                });
            } else {
                ResUtils.unauthorized(res, req);
            }
        });
    }
}

module.exports = {
    list: list,
    get: get,
    add: add,
    update: update,
    deleteApp: deleteApp
};