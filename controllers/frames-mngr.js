var framesHandler = require('../modelsWrapper/frames-mngr');

module.exports.getFramesByUser = async function (userNumber) {
    let framesInfo;
    try {
        framesInfo = await framesHandler.getFramesByUser(userNumber);
    } catch (err) {
        console.log(err);
    }
    return framesInfo;
}

module.exports.getAllFrames = async function () {
    let framesInfo;
    try {
        framesInfo = await framesHandler.getAllFrames();
    } catch (err) {
        console.log(err);
    }
    return framesInfo;
}

module.exports.createFramesByUser = async function (phoneNumber, frameObject) {
    let framesInfo;
    try {
        framesInfo = await framesHandler.createFrameByUser(phoneNumber, frameObject);
        if (framesInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.deleteFramesByNumber = async function (phoneNumber) {
    let framesInfo;
    try {
        framesInfo = await framesHandler.deleteFrameByNumber(phoneNumber);
        if (framesInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.updateFramesByNumber = async function (phoneNumber, frameObject) {
    let framesInfo;
    try {
        framesInfo = await framesHandler.updateFrameByNumber(phoneNumber, frameObject);
        if (framesInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}