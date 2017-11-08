let express = require('express');
let router = express.Router();
/* GET home page. */
router.get('/', function (req, res) {
    //res.render('index', { title: 'Express' });
    res.redirect('/index.html');
});
router.get('/test', (req, res) => {
    res.jsonp({});
});
module.exports = router;
