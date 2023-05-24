var offerBanner = require('../models/offerBanner');

module.exports.createOfferBannerImageMapping = async function (imgName, orderNumber) {
    let bannerInfo;
    try {
        bannerInfo = await offerBanner.create({
            img_name: imgName,
            orderNo: orderNumber
        });
        return true;
    } catch(err) {
        console.log(err);
    }
    return false;
}

module.exports.getAllImgOfOfferBanner = async function () {
    let bannersInfo;
    try {
        bannersInfo = await offerBanner.find().sort({orderNo:1});
    } catch (err) {
        console.log(err);
    }
    return bannersInfo;
}

module.exports.deleteImgFromOfferBannerByName = async function (imgName) {
    let banner;
    try {
        banner = await offerBanner.deleteOne({
            img_name: imgName
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}