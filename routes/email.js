let express = require('express');
let router = express.Router();
let EmailDao = require('../dao/emailDao');
router.post('/reg/:account', function (req, res) {
    EmailDao.regCode(req, res);
});
module.exports = router;
