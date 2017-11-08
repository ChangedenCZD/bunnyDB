let {DbUtils, ResUtils, ReqUtils, TextUtils, UUIDUtils, Md5, Sha256, DateUtils, RegUtils} = require('../utils/Utils');
let Keys = require('../secret/keys.json');

function genCheckApp(appId, appKey) {
    return `select creatorId userId from big_data_application where appId='${appId}' and appKey='${appKey}'`;
}

function genCheckClass(className, userId, appId) {
    return `select id from big_data_class where name='${className}' and creatorId='${userId}' and appId='${appId}'`;
}

function list(req, res) {
    const appId = req.header(Keys.HEADER_APP_ID) || '';
    const appKey = req.header(Keys.HEADER_APP_KEY) || '';
    if (appId && appKey) {
        const sql = `select * from big_data_class c LEFT JOIN big_data_application a on a.appId = c.appId where c.appId='${appId}' and c.creatorId=a.creatorId and a.appKey = '${appKey}'`;
        DbUtils.client().query(sql, [], (err, result) => {
            if (err) {
                ResUtils.dbError(res, err, req);
            } else if (result.length < 1) {
                ResUtils.error(res, '应用不存在或类不存在', null, null, req);
            } else {
                ResUtils.success(res, '类列表获取成功', {
                    list: result
                });
            }
        });
    } else {
        ResUtils.error(res, '应用不存在', null, null, req);
    }
}

function add(req, res) {
    const body = req.body;
    const className = body.className;
    const appId = req.header(Keys.HEADER_APP_ID) || '';
    const appKey = req.header(Keys.HEADER_APP_KEY) || '';
    if (!(TextUtils.checkLength(className, 1, 77) && RegUtils.test(className, RegUtils.REG.NUMBER_AND_ALPHABET_CHINESE))) {
        ResUtils.error(res, '类名由1~77个字符（数字、字母、汉字）组成', null, body, req);
    } else if (appId && appKey) {
        const classId = UUIDUtils.v4();
        //const sql = `insert into big_data_class(id,name,appId,creatorId) values('${classId}','${className}','${appId}','${userId}')`;
        let sql = `set @creatorId := (SELECT MAX(creatorId) from  big_data_application where appId = '${appId}' and appKey ='${appKey}' GROUP BY creatorId);
        insert into big_data_class(id,name,appId,creatorId) select '${classId}','${className}','${appId}',@creatorId 
        from big_data_application a where a.appId = '${appId}' and a.appKey ='${appKey}';`;
        DbUtils.client().query(sql, [], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    ResUtils.error(res, '该类名已存在', null, body, req);
                } else {
                    ResUtils.dbError(res, err, req);
                }
            } else if (result[result.length - 1].affectedRows) {
                ResUtils.success(res, '类创建成功', {
                    classInfo: {
                        classId: classId,
                        className: className,
                        appId: appId
                    }
                });
            } else {
                ResUtils.error(res, '类创建失败', null, body, req);
            }
        });
    } else {
        ResUtils.error(res, '应用不存在', null, null, req);
    }
}

function deleteClass(req, res) {
    const classId = req.params.classId || '';
    const appId = req.header(Keys.HEADER_APP_ID) || '';
    const appKey = req.header(Keys.HEADER_APP_KEY) || '';
    if (!TextUtils.checkLength(classId, 1, 77)) {
        ResUtils.error(res, '类不存在', null, null, req);
    } else if (appId && appKey) {
        const client = DbUtils.client();
        client.query(genCheckApp(appId, appKey), [], (err, result) => {
            if (err) {
                ResUtils.dbError(res, err, req);
            } else if (!(result && result.length > 0)) {
                ResUtils.error(res, '应用不存在', null, body, req);
            } else {
                const userId = result[0].userId;
                const sql = `delete from big_data_class where appId='${appId}' and creatorId='${userId}' and (id='${classId}' or name='${classId}')`;
                client.query(sql, [], (err, result) => {
                    if (err) {
                        ResUtils.dbError(res, err, req);
                    } else if (result && result.affectedRows) {
                        ResUtils.success(res, '类删除成功', {
                            userId: userId
                        });
                    } else {
                        ResUtils.error(res, '类不存在', null, null, req);
                    }
                });
            }
        });
    } else {
        ResUtils.error(res, '应用不存在', null, null, req);
    }
}

function update(req, res) {
    const classId = req.params.classId || '';
    const body = req.body;
    const className = body.className;
    const appId = req.header(Keys.HEADER_APP_ID) || '';
    const appKey = req.header(Keys.HEADER_APP_KEY) || '';
    if (!TextUtils.checkLength(classId, 1, 77)) {
        ResUtils.error(res, '类不存在', null, null, req);
    } else if (!(TextUtils.checkLength(className, 1, 77) && RegUtils.test(className, RegUtils.REG.NUMBER_AND_ALPHABET_CHINESE))) {
        ResUtils.error(res, '类名由1~77个字符（数字、字母、汉字）组成', null, body, req);
    } else if (appId && appKey) {
        const client = DbUtils.client();
        client.query(genCheckApp(appId, appKey), [], (err, result) => {
            if (err) {
                ResUtils.dbError(res, err, req);
            } else if (!(result && result.length > 0)) {
                ResUtils.error(res, '应用不存在', null, body, req);
            } else {
                const userId = result[0].userId;
                client.query(genCheckClass(className, userId, appId), [], (err, result) => {
                    if (err || !result) {
                        ResUtils.dbError(res, err, req);
                    } else if (result.length > 0) {
                        ResUtils.error(res, '该类名已存在', null, body, req);
                    } else {
                        const sql = `update big_data_class set name='${className}',updateAt='${DateUtils.format(new Date(), 'yyyy-mm-dd HH:MM:ss')}' where appId='${appId}' and creatorId='${userId}' and id='${classId}'`;
                        client.query(sql, [], (err, result) => {
                            if (err) {
                                ResUtils.dbError(res, err, req);
                            } else if (result && result.affectedRows) {
                                ResUtils.success(res, '类更新成功', {
                                    userId: userId
                                });
                            } else {
                                ResUtils.error(res, '类不存在', null, null, req);
                            }
                        });
                    }
                });
            }
        });
    } else {
        ResUtils.error(res, '应用不存在', null, null, req);
    }
}

function updateKey(req, res) {
    const classId = req.params.classId || '';
    const body = req.body;
    const fromKey = body.fromKey || '';
    const toKey = body.toKey || '';
    const appId = req.header(Keys.HEADER_APP_ID) || '';
    const appKey = req.header(Keys.HEADER_APP_KEY) || '';
    if (!TextUtils.checkLength(classId, 1, 77)) {
        ResUtils.error(res, '类不存在', null, body, req);
    } else if (!(TextUtils.checkLength(fromKey, 1, 1000) && TextUtils.checkLength(toKey, 1, 1000))) {
        ResUtils.error(res, '字段异常', null, body, req);
    } else if (appId && appKey) {
        const client = DbUtils.client();
        client.query(genCheckApp(appId, appKey), [], (err, result) => {
            if (err) {
                ResUtils.dbError(res, err, req);
            } else if (!(result && result.length > 0)) {
                ResUtils.error(res, '应用不存在', null, body, req);
            } else {
                let sql = `update big_data_object set objectKey='${toKey}' where classId='${classId}' and objectKey='${fromKey}'`;
                client.query(sql, [], (err, result) => {
                    if (err) {
                        ResUtils.dbError(res, err, req);
                    } else {
                        ResUtils.success(res, '字段更新成功', body);
                    }
                });
            }
        });
    } else {
        ResUtils.error(res, '应用不存在', null, null, req);
    }
}

function deleteKey(req, res) {
    const classId = req.params.classId || '';
    const body = req.body;
    const objectKey = body.objectKey || '';
    const appId = req.header(Keys.HEADER_APP_ID) || '';
    const appKey = req.header(Keys.HEADER_APP_KEY) || '';
    if (!TextUtils.checkLength(classId, 1, 77)) {
        ResUtils.error(res, '类不存在', null, body, req);
    } else if (!TextUtils.checkLength(objectKey, 1, 1000)) {
        ResUtils.error(res, '字段异常', null, body, req);
    } else if (appId && appKey) {
        const client = DbUtils.client();
        client.query(genCheckApp(appId, appKey), [], (err, result) => {
            if (err) {
                ResUtils.dbError(res, err, req);
            } else if (!(result && result.length > 0)) {
                ResUtils.error(res, '应用不存在', null, body, req);
            } else {
                let sql = `delete from big_data_object where classId='${classId}' and objectKey='${objectKey}'`;
                client.query(sql, [], (err, result) => {
                    if (err) {
                        ResUtils.dbError(res, err, req);
                    } else {
                        ResUtils.success(res, '字段删除成功', body);
                    }
                });
            }
        });
    } else {
        ResUtils.error(res, '应用不存在', null, null, req);
    }
}

module.exports = {
    add: add,
    list: list,
    delete: deleteClass,
    update: update,
    updateKey: updateKey,
    deleteKey: deleteKey
};