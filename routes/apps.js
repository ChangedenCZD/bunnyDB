const express = require('express');
const router = express.Router();
let AppDao = require('../dao/appDao');
/**获取应用列表*/
router.get('/', (req, res) => {
    AppDao.list(req, res);
});
/**获取应用详情*/
router.get('/:appId', (req, res, next) => {
    AppDao.get(req, res);
});
/**添加应用*/
router.post('/', (req, res) => {
    AppDao.add(req, res);
});
/**添加应用*/
router.put('/', (req, res) => {
    AppDao.add(req, res);
});
/**修改应用*/
router.put('/:appId', (req, res) => {
    AppDao.update(req, res);
});
/**删除应用*/
router.delete('/:appId', (req, res, next) => {
    AppDao.deleteApp(req, res);
});
module.exports = router;