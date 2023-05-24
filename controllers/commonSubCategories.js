var commonSubCategoriesController = require('../modelsWrapper/commonSubCategories');

module.exports.getAllCommonSubCateogry = async function () {
    let cmnSubCtgInfo;
    try {
        cmnSubCtgInfo = await commonSubCategoriesController.getAllCommonSubCateogry();
    } catch (err) {
        console.log(err);
    }
    return cmnSubCtgInfo;
}

module.exports.createCommonSubCategory = async function (cmnSubCtgData) {
    let cmnSubCtgInfo;
    try {
        cmnSubCtgInfo = await commonSubCategoriesController.createCommonSubCategory(cmnSubCtgData);
        if (cmnSubCtgInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.updateCommonSubCateogryInfo = async function (cmnSubCtgData) {
    let cmnSubCtgInfo;
    try {
        cmnSubCtgInfo = await commonSubCategoriesController.updateCommonSubCateogryInfo(cmnSubCtgData);
        if (cmnSubCtgInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.findCommonSubCategoryByName = async function (subctg_name) {
    let cmnSubCtgInfo;
    try {
        cmnSubCtgInfo = await commonSubCategoriesController.findCommonSubCategoryByName(subctg_name);
    } catch (err) {
        console.log(err);
    }
    return cmnSubCtgInfo;
}

module.exports.deleteCommonSubCategoryByName = async function (subctg_name) {
    let cmnSubCtgInfo;
    try {
        cmnSubCtgInfo = await commonSubCategoriesController.deleteCommonSubCategoryByName(subctg_name);
        if (cmnSubCtgInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}