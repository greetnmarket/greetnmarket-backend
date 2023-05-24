var upcomingFestivalBannerHandler = require('../modelsWrapper/upcomingFestivalBanner');
const { getBannerPicture } = require('../utils/image-video-processor');

module.exports.getAllImgOfupcomingFestivalBanner = async function () {
    let bannersInfo;
    let bannersDecodedInfo;
    try {
        bannersInfo = await upcomingFestivalBannerHandler.getAllImgOfupcomingFestivalBanner();
        if (bannersInfo) {
            bannersDecodedInfo = [];
            for await(let i of bannersInfo) {
                if (i.img_name) {
                    i.image_url = await getBannerPicture(i.img_name);
                    bannersDecodedInfo.push({
                        img_name: i.img_name,
                        image_url: i.image_url,
                        sub_ctg_name: i.sub_ctg_name,
                        from: i.from,
                        to: i.to,
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

module.exports.getNonExpiredImgOfupcomingFestivalBanner = async function () {
    let bannersInfo;
    let bannersDecodedInfo;
    try {
        bannersInfo = await upcomingFestivalBannerHandler.getNonExpiredImgOfupcomingFestivalBanner();
        if (bannersInfo) {
            bannersDecodedInfo = [];
            for await(let i of bannersInfo) {
                if (i.img_name) {
                    i.image_url = await getBannerPicture(i.img_name);
                    bannersDecodedInfo.push({
                        img_name: i.img_name,
                        image_url: i.image_url,
                        sub_ctg_name: i.sub_ctg_name,
                        from: i.from,
                        to: i.to,
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

module.exports.createUpcomingFestivalBannerImageMapping = async function (bnrData) {
    let bannersInfo;
    try {
        bannersInfo = await upcomingFestivalBannerHandler.createUpcomingFestivalBannerImageMapping(bnrData);
        if (bannersInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.deleteImgFromUpcomingFestivalBannerByName = async function (imgName) {
    let bannersInfo;
    try {
        bannersInfo = await upcomingFestivalBannerHandler.deleteImgFromUpcomingFestivalBannerByName(imgName);
        if (bannersInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}