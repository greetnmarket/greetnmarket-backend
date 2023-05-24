var upcomingFestivalBanner = require('../models/upcomingFestivalBanner');

module.exports.createUpcomingFestivalBannerImageMapping = async function (bnrData) {
    let bannerInfo;
    try {
        bannerInfo = await upcomingFestivalBanner.create({
            img_name: bnrData.imgName,
            sub_ctg_name: bnrData.subCtgName,
            from: bnrData.from || new Date(),
            to: bnrData.to || new Date(),
            orderNo: bnrData.orderNo || 0
        });
        return true;
    } catch(err) {
        console.log(err);
    }
    return false;
}

module.exports.getAllImgOfupcomingFestivalBanner = async function () {
    let bannersInfo;
    try {
        bannersInfo = await upcomingFestivalBanner.find().sort({orderNo:1});
    } catch (err) {
        console.log(err);
    }
    return bannersInfo;
}

module.exports.getNonExpiredImgOfupcomingFestivalBanner = async function () {
    let fromDate = new Date();
    let futureTillDate = new Date();
    futureTillDate.setDate(futureTillDate.getDate() + 5);
    futureTillDate = futureTillDate.setHours(23, 59, 59, 999);
    let toDate = new Date();
    toDate = toDate.setHours(23, 59, 59, 999);
    let bannersInfo;
    try {
        bannersInfo = await upcomingFestivalBanner.find({
            $or: [
                {
                    $and: [
                        {
                            from: {
                                $gte: fromDate
                            }
                        },
                        {
                            from: {
                                $lte: futureTillDate
                            }
                        }
                    ]
                },
                {
                    to: {
                        $gte: toDate
                    }
                }
            ]
        }).sort({orderNo:1});
    } catch (err) {
        console.log(err);
    }
    return bannersInfo;
}

module.exports.deleteImgFromUpcomingFestivalBannerByName = async function (imgName) {
    let banner;
    try {
        banner = await upcomingFestivalBanner.deleteOne({
            img_name: imgName
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}
