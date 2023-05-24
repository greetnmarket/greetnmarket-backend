var subCtgTextBannerHandler = require('../modelsWrapper/subCtgTextBanner');

module.exports.addSubCateogryToTextBanner = async function (name, subCtgName, orderNumber) {
    let subCtgTxtBnrInfo;
    try {
        subCtgTxtBnrInfo = await subCtgTextBannerHandler.addSubCateogryToTextBanner(name, subCtgName, orderNumber);
        if (subCtgTxtBnrInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false
}

module.exports.deleteSubCategoryFromTextBannerByName = async function (name) {
    let subCtgTxtBnrInfo;
    try {
        subCtgTxtBnrInfo = await subCtgTextBannerHandler.deleteSubCategoryFromTextBannerByName(name);
        if (subCtgTxtBnrInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.getAllTextBannerSubCategory = async function () {
    let subCtgTxtBnrInfo;
    try {
        subCtgTxtBnrInfo = await subCtgTextBannerHandler.getAllTextBannerSubCategory();
    } catch (err) {
        console.log(err);
    }
    return subCtgTxtBnrInfo;
}