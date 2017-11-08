let {ResUtils, UUIDUtils, Md5, RedisUtils, RegUtils} = require('../utils/Utils');
let EmailUtils = require('../utils/EmailUtils');

function regCode(req, res) {
    let account = req.params.account;
    let email = req.body.email;
    let resultObj = {
        account: account,
        email: email
    };
    if (!account) {
        ResUtils.error(res, '请输入正确的账户', null, resultObj, req);
    } else if (!RegUtils.test(email, RegUtils.REG.EMAIL)) {
        ResUtils.error(res, '请输入正确的邮箱', null, resultObj, req);
    } else {
        let md5 = Md5(account + email);
        RedisUtils.get(md5, (err, value) => {
            if (err || !value) {
                let code = UUIDUtils._v4().split('-')[2];
                let content = `这是您的 BunnyDB 用户注册验证码，请勿泄露！有效时间为10分钟。验证码： ${code}`;
                RedisUtils.set(md5, code, 600);
                EmailUtils.sendMail(EmailUtils.createOptions(email, 'BunnyDB 用户注册验证码', content, null),
                    (err, msg) => {
                        if (err) {
                            ResUtils.error(res, '邮件发送失败', null, resultObj, req);
                        } else {
                            ResUtils.success(res, '注册验证码已发送至您的邮箱，请注意查收。期间可能会有网络延时，请耐心等待。', resultObj, req);
                        }
                    });
            } else {
                console.log(value);
                ResUtils.error(res, 'Bunny刚刚已发送了一个验证码已发送至您的邮箱，请注意查收。期间可能会有网络延时，请耐心等待。', null, resultObj, req);
            }
        });
    }
}

module.exports = {
    regCode: regCode
};