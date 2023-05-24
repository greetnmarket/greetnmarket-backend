var cmnSubCtg = require('../models/commonSubCategories');

module.exports.createCommonSubCategory = async function (cmnSubCtgData) {
    let cmnSubCtgInfo;
    try {
        cmnSubCtgInfo = await cmnSubCtg.create({
            cmn_sub_ctg_name: cmnSubCtgData.subctg_name,
            enabled: cmnSubCtgData.enabled || 0,
            orderNo: cmnSubCtgData.orderNo || 0,
            cmn_sub_ctg_list_assoc: cmnSubCtgData.cmn_sub_ctg_list_assoc || []
        });
        return true;
    } catch(err) {
        console.log(err);
    }
    return false;
}

module.exports.getAllCommonSubCateogry = async function () {
    let cmnSubCtgInfo;
    try {
        cmnSubCtgInfo = await cmnSubCtg.find().sort({orderNo:1});
    } catch (err) {
        console.log(err);
    }
    return cmnSubCtgInfo;
}

module.exports.updateCommonSubCateogryInfo = async function (cmnSubCtgData) {
    let cmnSubCtgInfo;
    try {
        cmnSubCtgInfo = await cmnSubCtg.findOneAndUpdate({
            cmn_sub_ctg_name: cmnSubCtgData.subctg_name
        }, cmnSubCtgData);
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.findCommonSubCategoryByName = async function (subctg_name) {
    let cmnSubCtgInfo;
    try {
        cmnSubCtgInfo = await cmnSubCtg.findOne({
            cmn_sub_ctg_name: subctg_name
        });
    } catch (err) {
        console.log(err);
    }
    return cmnSubCtgInfo;
}

module.exports.deleteCommonSubCategoryByName = async function (subctg_name) {
    let cmnSubCtgInfo;
    try {
        cmnSubCtgInfo = await cmnSubCtg.deleteOne({
            cmn_sub_ctg_name: subctg_name
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}