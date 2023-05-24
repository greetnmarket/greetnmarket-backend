const Frames = require("../models/frames-mngr");

module.exports.getAllFrames = async function () {
    let allFrames;
    try {
        allFrames = await Frames.find();
    } catch (err) {
        console.log(err);
    }
    return allFrames;
}

module.exports.getFramesByUser = async function (phoneNumber) {
    let userFrames;
    try {
        userFrames = await Frames.find({
            user: phoneNumber
        });
    } catch (err) {
        console.log(err);
    }
    return userFrames;
}

module.exports.deleteFrameByNumber = async function (phoneNumber) {
    let frame;
    try {
        frame = await Frames.findOneAndDelete({
            user: phoneNumber
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.createFrameByUser = async function (phoneNumber, frameObject) {
    let frame;
    try {
        frame = await Frames.create({
            user: phoneNumber,
            frame_info: frameObject
        });
        return true
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.updateFrameByNumber = async function (phoneNumber, frameObject) {
    let frame;
    try {
        frame = await Frames.findOneAndUpdate({
            user: phoneNumber
        }, {
            frame_info: frameObject
        });
        return true
    } catch (err) {
        console.log(err);
    }
    return false;
}