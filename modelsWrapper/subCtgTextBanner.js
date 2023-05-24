var subCtgTextBanner = require('../models/subCtgTextBanner');

module.exports.addSubCateogryToTextBanner = async function (name, subCtgName, orderNumber) {
    let subCtgInfo;
    try {
        subCtgInfo = await subCtgTextBanner.create({
            name: name,
            sub_ctg_name: subCtgName,
            orderNo: orderNumber || 0
        });
        return true;
    } catch(err) {
        console.log(err);
    }
    return false;
}

module.exports.getAllTextBannerSubCategory = async function () {
    let subCtgInfo;
    try {
        subCtgInfo = await subCtgTextBanner.find().sort({orderNo:1});
    } catch (err) {
        console.log(err);
    }
    return subCtgInfo;
}

module.exports.deleteSubCategoryFromTextBannerByName = async function (name) {
    let banner;
    try {
        banner = await subCtgTextBanner.deleteOne({
            name: name
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}