/**
 * Created by Changeden on 2017/7/18.
 * 文本工具类
 */
function checkLength(text, min, max) {
    return text && text.length >= min && text.length <= max;
}

function stringToInt(text) {
    let num = 0;
    if (text) {
        const charArray = text.split('');
        charArray.forEach((char) => {
            num += char.charCodeAt();
        });
    }
    return num;
}

module.exports = {
    checkLength: checkLength,
    stringToInt: stringToInt
};