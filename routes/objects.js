const express = require('express');
const router = express.Router();
let ObjectDao = require('../dao/objectDao');
/**获取某个类的记录列表*/
router.get('/:classId', (req, res, next) => {
    ObjectDao.values(req, res);
});
/**根据某个记录Id获取记录详情*/
router.get('/id/:objectId', (req, res, next) => {
    ObjectDao.values(req, res);
});
/**添加记录*/
router.post('/:classId', (req, res) => {
    ObjectDao.add(req, res);
});
/**更新记录*/
router.put('/:objectId', (req, res) => {
    ObjectDao.update(req, res);
});
/**删除记录*/
router.delete('/id/:objectId', (req, res) => {
    ObjectDao.deleteValue(req, res);
});
/**删除某个类中的某个字段*/
router.delete('/key/:classId', (req, res) => {
    ObjectDao.deleteKey(req, res);
});
module.exports = router;