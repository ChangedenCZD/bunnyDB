const express = require('express');
const router = express.Router();
let ClassDao = require('../dao/classDao');
/**获取类列表*/
router.get('/', (req, res) => {
    ClassDao.list(req, res);
});
/**添加类*/
router.post('/', (req, res) => {
    ClassDao.add(req, res);
});
/**添加类*/
router.put('/', (req, res) => {
    ClassDao.add(req, res);
});
/**修改类*/
router.put('/:classId', (req, res) => {
    ClassDao.update(req, res);
});

/**删除类*/
function deleteClass(req, res) {
    ClassDao.delete(req, res);
}

router.delete('/', deleteClass);
router.delete('/:classId', deleteClass);
/**修改类中的键*/
router.put('/key/:classId', (req, res) => {
    ClassDao.updateKey(req, res);
});
/**删除类中的键*/
router.delete('/key/:classId', (req, res) => {
    ClassDao.deleteKey(req, res);
});
module.exports = router;