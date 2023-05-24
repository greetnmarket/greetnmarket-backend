require('dotenv').config();
var jwt = require('jsonwebtoken');


module.exports.generateAccessToken = async function (info) {
    let accessToken = jwt.sign({
        data: info
    }, process.env.JWT_PRIVATE_KEY, { expiresIn: '2d' });
    return accessToken;
}

module.exports.generateRefreshToken = async function (accessToken) {
    let refreshtoken = jwt.sign({
        data: {
            'oldToken': accessToken
        }
    }, process.env.JWT_PRIVATE_KEY);
    return refreshtoken;
}

module.exports.verfiyAccessToken = async function (accessToken) {
    try {
        var decoded = jwt.verify(accessToken, process.env.JWT_PRIVATE_KEY);
        console.log(decoded);
        return true;
    } catch(err) {
        return false;
    }
}

module.exports.verfiyRefreshToken = async function (refreshtoken) {
    try {
        var decoded = jwt.verify(refreshtoken, process.env.JWT_PRIVATE_KEY);
        console.log(decoded);
        return true;
    } catch(err) {
        return false;
    }
}

module.exports.decodeToken = async function (token) {
    try {
        var decoded = jwt.decode(token);
        console.log(decoded);
        return decoded;
    } catch(err) {
        return '';
    }
}
