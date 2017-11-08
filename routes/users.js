const express = require('express');
const router = express.Router();
let UserDao = require('../dao/userDao');
/**检测用户名是否被占用*/
const check = (req, res, next) => {
    UserDao.check(req, res);
};
/**检测用户名是否被占用*/
router.get('/', check);
router.get('/:account', check);
/**注册*/
router.put('/', (req, res) => {
    UserDao.signUp(req, res);
});
/**登录*/
router.post('/', (req, res) => {
    UserDao.signIn(req, res);
});
module.exports = router;