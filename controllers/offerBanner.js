var offerBannerHandler = require('../modelsWrapper/offerBanner');
const { getBannerPicture } = require('../utils/image-video-processor');

module.exports.getAllImgOfOfferBanner = async function () {
    let bannersInfo;
    let bannersDecodedInfo;
    try {
        bannersInfo = await offerBannerHandler.getAllImgOfOfferBanner();
        if (bannersInfo) {
            bannersDecodedInfo = [];
            for await(let i of bannersInfo) {
                if (i.img_name) {
                    i.image_url = await getBannerPicture(i.img_name);
                    bannersDecodedInfo.push({
                        img_name: i.img_name,
                        image_url: i.image_url,
                        orderNo: i.orderNo,
                        id: i._id
                    });
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
    return bannersDecodedInfo;
}

module.exports.createOfferBannerImageMapping = async function (imgName, orderNumber) {
    let bannersInfo;
    try {
        bannersInfo = await offerBannerHandler.createOfferBannerImageMapping(imgName, orderNumber);
        if (bannersInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.deleteImgFromOfferBannerByName = async function (imgName) {
    let bannersInfo;
    try {
        bannersInfo = await offerBannerHandler.deleteImgFromOfferBannerByName(imgName);
        if (bannersInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}