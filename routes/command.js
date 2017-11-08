let express = require('express');
let router = express.Router();
let myProcress = require('child_process');
let Keys = require('../secret/keys.json');
router.get('/nginx/reload', (req, res, next) => {
    let cert = req.header(Keys.HEADER_SERVER_CERT);
    if (cert === Keys.HEADER_SERVER_REAL_ID) {
        myProcress.exec('nginx -s reload', (error, stdout, stderr) => {
            res.jsonp({
                error: error,
                stdout: stdout,
                stderr: stderr
            });
        });
    } else {
        next();
    }
});
router.get('/pm2/:command', (req, res, next) => {
    let cert = req.header(Keys.HEADER_SERVER_CERT);
    let commandStr = '';
    switch (req.params.command) {
        case 'list':
            commandStr = 'pm2 list';
            break;
        case 'restart':
            commandStr = 'pm2 restart all';
            break;
    }
    if (cert === Keys.HEADER_SERVER_REAL_ID && commandStr) {
        myProcress.exec(commandStr, (error, stdout, stderr) => {
            res.jsonp({
                error: error,
                stdout: stdout,
                stderr: stderr
            });
        });
    } else {
        next();
    }
});
module.exports = router;
