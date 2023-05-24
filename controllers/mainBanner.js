var mainBannerHandler = require('../modelsWrapper/mainBanner');
const { getBannerPicture } = require('../utils/image-video-processor');

module.exports.getAllImgOfMainBanner = async function () {
    let bannersInfo;
    let bannersDecodedInfo;
    try {
        bannersInfo = await mainBannerHandler.getAllImgOfMainBanner();
        if (bannersInfo) {
            bannersDecodedInfo = [];
            for await(let i of bannersInfo) {
                if (i.img_name) {
                    i.image_url = await getBannerPicture(i.img_name);
                    bannersDecodedInfo.push({
                        img_name: i.img_name,
                        image_url: i.image_url,
                        sub_ctg_name: i.sub_ctg_name,
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

module.exports.createMainBannerImageMapping = async function (bnrData) {
    let bannersInfo;
    try {
        bannersInfo = await mainBannerHandler.createMainBannerImageMapping(bnrData);
        if (bannersInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.deleteImgFromMainBannerByName = async function (imgName) {
    let bannersInfo;
    try {
        bannersInfo = await mainBannerHandler.deleteImgFromMainBannerByName(imgName);
        if (bannersInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}