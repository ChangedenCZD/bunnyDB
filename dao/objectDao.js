let {DbUtils, ResUtils, TextUtils, UUIDUtils, DateUtils, Md5, RedisUtils} = require('../utils/Utils');
let Keys = require('../secret/keys.json');

function genCheckApp(appId, appKey) {
    return `select creatorId userId from big_data_application where appId='${appId}' and appKey='${appKey}'`;
}

function values(req, res) {
    let params = req.params || {};
    let classId = params.classId || '';
    let objectId = params.objectId || '';
    let query = req.query || {};
    let where = query.where || '';
    let groupBy = query.groupBy || '';
    let orderBy = query.orderBy || '';
    let limit = query.limit || '';
    let sha256JSON = {
        params: params,
        query: query
    };
    const md5 = Md5(`${JSON.stringify(sha256JSON)}`);
    RedisUtils.get(md5, (err, value) => {
        if (!err && value) {
            if (objectId) {
                ResUtils.success(res, '记录获取成功', {
                    object: value
                }, req);
            } else {
                ResUtils.success(res, '记录列表获取成功', {
                    list: value
                }, req);
            }
        } else {
            let sql = `
            DROP PROCEDURE IF EXISTS proc;
            CREATE PROCEDURE proc (cId varchar(36))
            BEGIN
                DECLARE objIdArr TEXT DEFAULT NULL;
                DECLARE objIdLen INT DEFAULT 0;
                DECLARE objIdIdx INT DEFAULT 1;
                DECLARE objId TEXT DEFAULT '';
                DECLARE objKey TEXT DEFAULT NULL;
                DECLARE realObjKey TEXT DEFAULT NULL;
                DECLARE objKeyLen INT DEFAULT 0;
                DECLARE objKeyIdx INT DEFAULT 1;
                DECLARE tempTabCreateSql VARCHAR(255) DEFAULT 'CREATE TEMPORARY TABLE tempTable(';
                DECLARE itemKeyArr TEXT DEFAULT NULL;
                DECLARE itemValueArr TEXT DEFAULT NULL;
                DECLARE itemTypeArr TEXT DEFAULT NULL;
                DECLARE itemLenArr INT DEFAULT 0;
                DECLARE itemIdx INT DEFAULT 1;
                DECLARE itemInsertSql VARCHAR(255) DEFAULT 'insert into tempTable(';
                DECLARE itemSupportSql VARCHAR(255) DEFAULT '';
                DECLARE realItemKey TEXT DEFAULT NULL;
                DECLARE realItemValue TEXT DEFAULT NULL;
                DECLARE realItemType TEXT DEFAULT NULL;
                DECLARE realObjectId TEXT DEFAULT NULL;
                DECLARE realCreateAt TIMESTAMP DEFAULT NULL;
                DECLARE realUpdateAt TIMESTAMP DEFAULT NULL;
                DROP TABLE IF EXISTS tempTable;
                SELECT GROUP_CONCAT(distinct objectKey) INTO objKey from big_data_object where classId=cId;
                SET objKeyLen = (length(objKey)-length(replace(objKey,',',''))+1);
                WHILE objKeyIdx <= objKeyLen DO
                    SELECT REVERSE(SUBSTRING_INDEX(REVERSE(SUBSTRING_INDEX(objKey, ",", objKeyIdx)), ",", 1)) into realObjKey;
                    SET tempTabCreateSql = CONCAT(tempTabCreateSql,realObjKey,' TEXT,_',realObjKey,'Type TEXT,');
                    SET objKeyIdx = objKeyIdx+1;
                END WHILE;
                SET @tempTabCreateSql = CONCAT(tempTabCreateSql, 'createAt TIMESTAMP,updateAt TIMESTAMP,objectId varchar(36))');
                PREPARE rowtocolumn FROM @tempTabCreateSql;
                EXECUTE rowtocolumn;
                SELECT GROUP_CONCAT(distinct objectId) into objIdArr from big_data_object where classId = cId;
                SET objIdLen = (length(objIdArr)-length(replace(objIdArr,',',''))+1);
                WHILE objIdIdx <= objIdLen DO
                    SELECT REVERSE(SUBSTRING_INDEX(REVERSE(SUBSTRING_INDEX(objIdArr, ",", objIdIdx)), ",", 1)) into objId;
                    SELECT GROUP_CONCAT(objectKey),GROUP_CONCAT(objectValue),GROUP_CONCAT(objectType),MIN(createAt),MAX(updateAt),MAX(objectId) INTO itemKeyArr,itemValueArr,itemTypeArr,realCreateAt,realUpdateAt,realObjectId from big_data_object WHERE objectId =objId;
                    SET itemLenArr = (length(itemKeyArr)-length(replace(itemKeyArr,',',''))+1);
                    WHILE itemIdx <= itemLenArr DO
                        SELECT REVERSE(SUBSTRING_INDEX(REVERSE(SUBSTRING_INDEX(itemKeyArr, ",", itemIdx)), ",", 1)) into realItemKey;
                        SELECT REVERSE(SUBSTRING_INDEX(REVERSE(SUBSTRING_INDEX(itemValueArr, ",", itemIdx)), ",", 1)) into realItemValue;
                        SELECT REVERSE(SUBSTRING_INDEX(REVERSE(SUBSTRING_INDEX(itemTypeArr, ",", itemIdx)), ",", 1)) into realItemType;
                        SET realItemKey = case realItemKey when null then "" else realItemKey end;
                        SET realItemValue = case realItemValue when null then "" else realItemValue end;
                        SET realItemType = case realItemType when null then "string" else realItemType end;
                        SET itemInsertSql = CONCAT(itemInsertSql,realItemKey,',_',realItemKey,'Type,');
                        SET itemSupportSql = CONCAT(itemSupportSql,'"',realItemValue,'","',realItemType,'",');
                        SET itemIdx = itemIdx+1;
                    END WHILE;
                    SET itemSupportSql = CONCAT(itemSupportSql,'"',realObjectId,'"');
                    SET @insertSql = CONCAT(itemInsertSql,'objectId) values(',itemSupportSql,')');
                    PREPARE insertSql FROM @insertSql;
                    EXECUTE insertSql;
                    update tempTable set createAt = realCreateAt,updateAt = realUpdateAt where objectId = objId;
                    SET objIdIdx = objIdIdx+1;
                    SET itemInsertSql = 'insert into tempTable(';
                    SET itemSupportSql = '';
                    SET itemIdx = 1;
                END WHILE;
            END;`;
            if (objectId) {
                sql += `set @currentClassId := (SELECT MAX(classId) from  big_data_object where objectId = '${objectId}' GROUP BY objectId);
            CALL proc(cast(@currentClassId as CHAR(36) CHARACTER SET utf8));
            SELECT * from (SELECT c1.appId bunny_db_appId,c1.name bunny_db_className,c1.id bunny_db_classId,c2.* FROM big_data_class c1,tempTable c2 where c1.id = cast(@currentClassId as CHAR(36) CHARACTER SET utf8) and c2.objectId='${objectId}') c`;
            } else {
                sql += `CALL proc('${classId}');
            SELECT * from (SELECT c1.appId bunny_db_appId,c1.name bunny_db_className,c1.id bunny_db_classId,c2.* FROM big_data_class c1,tempTable c2 where c1.id = '${classId}') c`;
            }
            if (where) {
                sql += ` where ${where} `;
            }
            if (groupBy) {
                sql += ` group by ${groupBy} `;
            }
            if (orderBy) {
                sql += ` order by ${orderBy} `;
            } else {
                sql += ` order by updateAt desc `;
            }
            if (limit) {
                sql += ` limit ${limit} `;
            } else {
                sql += ` limit 1,40 `;
            }
            sql += `;
            DROP TABLE IF EXISTS tempTable;
            DROP PROCEDURE IF EXISTS proc;`;
            DbUtils.client().query(sql, true, (err, result) => {
                if (err) {
                    ResUtils.dbError(res, err, req);
                } else {
                    if (objectId) {
                        let list = result[result.length - 3] || [];
                        if (list.length && list[0]) {
                            let object = fixObject(list[0]);
                            RedisUtils.set(md5, object, 0.444);
                            ResUtils.success(res, '记录获取成功', {
                                object: object
                            }, req);
                        } else {
                            ResUtils.error(res, `Id为${objectId}的记录不存在`, null, null, req);
                        }
                    } else {
                        let newList = [];
                        (result[result.length - 3] || []).forEach((item) => {
                            newList.push(fixObject(item));
                        });
                        RedisUtils.set(md5, newList, 0.444);
                        ResUtils.success(res, '记录列表获取成功', {
                            list: newList
                        }, req);
                    }
                }
            });
        }
    });
}

function fixObject(obj) {
    let newObj = {};
    obj = obj || {};
    let types = {};
    for (let objKey in obj) {
        if (obj.hasOwnProperty(objKey)) {
            let value = obj[objKey];
            if (value && objKey.startsWith('_') && objKey.endsWith('Type')) {
                types[objKey] = value;
            } else if (value || typeof(value) === 'string' || typeof(value) === 'number') {
                switch (obj['_' + objKey + 'Type']) {
                    case 'number':
                        value = Number(value);
                        break;
                    case 'string':
                        value = String(value);
                        break;
                    case 'boolean':
                        value = Boolean(value);
                        break;
                }
                newObj[objKey] = value;
            }
        }
    }
    newObj.types = types;
    return newObj;
}

function add(req, res) {
    const params = req.params;
    const classId = params.classId || '';
    const body = req.body;
    const appId = req.header(Keys.HEADER_APP_ID) || '';
    const appKey = req.header(Keys.HEADER_APP_KEY) || '';
    if (!TextUtils.checkLength(classId, 1, 77)) {
        ResUtils.error(res, '类不存在', null, body, req);
    } else if (appId && appKey) {
        let sql = `DROP TABLE IF EXISTS tempInsertTable;
        CREATE TEMPORARY TABLE tempInsertTable(id varchar(36),classId varchar(36),objectId varchar(36),objectKey varchar(200),objectValue TEXT,objectType TEXT);
        insert into tempInsertTable VALUES `;
        let objectId = UUIDUtils.v4();
        for (let objKey in body) {
            if (body.hasOwnProperty(objKey)) {
                let value = body[objKey];
                sql += `('${UUIDUtils.v4()}','${classId}','${objectId}','${objKey}','${value}','${typeof(value)}'),`;
            }
        }
        sql = sql.substr(0, sql.length - 1) + `;`;
        sql += `insert into big_data_object(id,classId,objectId,objectKey,objectValue,objectType) select t.* from big_data_application a left JOIN tempInsertTable t on a.appId ='${appId}' and a.appKey ='${appKey}';`;
        sql += `DROP TABLE IF EXISTS tempInsertTable;`;
        DbUtils.client().query(sql, [], (err, result) => {
            if (err) {
                ResUtils.dbError(res, err, req);
            } else {
                let affectedRows = result[result.length - 2].affectedRows || 0;
                if (affectedRows) {
                    ResUtils.success(res, '记录插入成功', {
                        objectId: objectId
                    });
                } else {
                    ResUtils.error(res, '记录插入失败', null, body, req);
                }
            }
        });
    } else {
        ResUtils.error(res, '应用不存在', null, body, req);
    }
}

function update(req, res) {
    const params = req.params;
    const objectId = params.objectId || '';
    const body = req.body;
    const appId = req.header(Keys.HEADER_APP_ID) || '';
    const appKey = req.header(Keys.HEADER_APP_KEY) || '';
    if (!TextUtils.checkLength(objectId, 1, 77)) {
        ResUtils.error(res, '记录不存在', null, body, req);
    } else if (appId && appKey) {
        const client = DbUtils.client();
        client.query(genCheckApp(appId, appKey), [], (err, result) => {
            if (err) {
                ResUtils.dbError(res, err, req);
            } else if (!(result && result.length > 0)) {
                ResUtils.error(res, '应用不存在', null, body, req);
            } else {
                const userId = result[0].userId;
                let sql = `set @currentClassId := (SELECT MAX(classId) from  big_data_object where objectId = '${objectId}' GROUP BY objectId);`;
                for (let objKey in body) {
                    if (body.hasOwnProperty(objKey)) {
                        let value = body[objKey];
                        sql += `
                    INSERT INTO big_data_object(id,classId,objectId,objectKey,objectValue,objectType) 
                    VALUES('${UUIDUtils.v4()}',cast(@currentClassId as CHAR(36) CHARACTER SET utf8),'${objectId}','${objKey}','${value}','${typeof(value)}') 
                    ON DUPLICATE KEY UPDATE objectValue = '${value}' , objectType = '${typeof(value)}' , updateAt='${DateUtils.format(new Date(), 'yyyy-mm-dd HH:MM:ss')}';`;
                    }
                }
                client.query(sql, [], (err, result) => {
                    if (err) {
                        ResUtils.dbError(res, err, req);
                    } else {
                        ResUtils.success(res, '记录更新成功', {
                            userId: userId,
                            objectId: objectId
                        });
                    }
                });
            }
        });
    } else {
        ResUtils.error(res, '应用不存在', null, body, req);
    }
}

function deleteValue(req, res) {
    const params = req.params;
    const objectId = params.objectId || '';
    const appId = req.header(Keys.HEADER_APP_ID) || '';
    const appKey = req.header(Keys.HEADER_APP_KEY) || '';
    if (!TextUtils.checkLength(objectId, 1, 77)) {
        ResUtils.error(res, '记录不存在', null, null, req);
    } else if (appId && appKey) {
        const client = DbUtils.client();
        client.query(genCheckApp(appId, appKey), [], (err, result) => {
            if (err) {
                ResUtils.dbError(res, err, req);
            } else if (!(result && result.length > 0)) {
                ResUtils.error(res, '应用不存在', null, body, req);
            } else {
                const userId = result[0].userId;
                let sql = `delete from big_data_object where objectId='${objectId}'`;
                client.query(sql, [], (err, result) => {
                    if (err) {
                        ResUtils.dbError(res, err, req);
                    } else {
                        ResUtils.success(res, '记录删除成功', {
                            userId: userId,
                            objectId: objectId
                        });
                    }
                });
            }
        });
    } else {
        ResUtils.error(res, '应用不存在', null, null, req);
    }
}

function deleteKey(req, res) {
    const params = req.params;
    const classId = params.classId || '';
    const body = req.body;
    const appId = req.header(Keys.HEADER_APP_ID) || '';
    const appKey = req.header(Keys.HEADER_APP_KEY) || '';
    if (!TextUtils.checkLength(classId, 1, 77)) {
        ResUtils.error(res, '类不存在', null, body, req);
    } else if (!body.objectKey) {
        ResUtils.error(res, '字段不能为空', null, body, req);
    } else if (appId && appKey) {
        const client = DbUtils.client();
        client.query(genCheckApp(appId, appKey), [], (err, result) => {
            if (err) {
                ResUtils.dbError(res, err, req);
            } else if (!(result && result.length > 0)) {
                ResUtils.error(res, '应用不存在', null, body, req);
            } else {
                const userId = result[0].userId;
                let sql = `delete from big_data_object where classId='${classId}' and objectKey='${body.objectKey}'`;
                client.query(sql, [], (err, result) => {
                    if (err) {
                        ResUtils.dbError(res, err, req);
                    } else {
                        ResUtils.success(res, '字段删除成功', {
                            userId: userId,
                            classId: classId
                        });
                    }
                });
            }
        });
    } else {
        ResUtils.error(res, '应用不存在', null, body, req);
    }
}

module.exports = {
    values: values,
    add: add,
    update: update,
    deleteValue: deleteValue,
    deleteKey: deleteKey
};