const REG = {
    NUMBER_AND_ALPHABET: /^[A-Za-z0-9]+$/,
    NUMBER_AND_ALPHABET_CHINESE: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
    EMAIL: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
};

function test(text, reg) {
    return reg.test(text);
}

module.exports = {
    REG: REG,
    test: test
};