var mainBanner = require('../models/mainBanner');

module.exports.createMainBannerImageMapping = async function (bnrData) {
    let bannerInfo;
    try {
        bannerInfo = await mainBanner.create({
            img_name: bnrData.imgName,
            sub_ctg_name: bnrData.subCtgName,
            orderNo: bnrData.orderNo || 0
        });
        return true;
    } catch(err) {
        console.log(err);
    }
    return false;
}

module.exports.getAllImgOfMainBanner = async function () {
    let bannersInfo;
    try {
        bannersInfo = await mainBanner.find().sort({orderNo:1});
    } catch (err) {
        console.log(err);
    }
    return bannersInfo;
}

module.exports.deleteImgFromMainBannerByName = async function (imgName) {
    let banner;
    try {
        banner = await mainBanner.deleteOne({
            img_name: imgName
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}