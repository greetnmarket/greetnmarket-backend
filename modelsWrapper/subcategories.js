const subCategories = require('../models/subcategories');

module.exports.createCategorySubCategoryMap = async function (subCtgName, orderNumber, sub_ctg_list_assoc) {
    let subCategory;
    try {
        subCategory = await subCategories.create({
            sub_ctg_name: subCtgName,
            orderNo: orderNumber,
            sub_ctg_list_assoc: sub_ctg_list_assoc || []
        });
        return true;
    } catch(err) {
        console.log(err);
    }
    return false;
}

module.exports.mapCategoryToSubCategory = async function (subCtgName, ctgName) {
    let subCategoryInfo;
    try {
        subCategoryInfo = await subCategories.findOneAndUpdate({
            sub_ctg_name: subCtgName
        }, {
            $addToSet: {
                ctg_associaton: ctgName
            }
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.unlinkCategoryFromSubCategory = async function (subCtgName, ctgName) {
    let updateSubCtgAndCtgAssoc;
    try {
        updateSubCtgAndCtgAssoc = await subCategories.findOneAndUpdate({
            sub_ctg_name: subCtgName
        }, {
            $pull: {
                ctg_associaton: ctgName
            } 
        });
        if (updateSubCtgAndCtgAssoc) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.getAllSubCategories = async function () {
    let allsubCategories;
    try {
        allsubCategories = await subCategories.find().sort({orderNo:1});
    } catch (err) {
        console.log(err);
    }
    return allsubCategories;
}

module.exports.findSubCategoryByName = async function (ctgName) {
    let subCategory;
    try {
        subCategory = await subCategories.findOne({
            sub_ctg_name: ctgName
        });
    } catch (err) {
        console.log(err);
    }
    return subCategory;
}

module.exports.deleteSubCategoryByName = async function (ctgName) {
    let category;
    try {
        category = await subCategories.deleteOne({
            sub_ctg_name: ctgName
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.findSubCategoryByCategory = async function (ctgName) {
    let ctgInfo;
    try {
        ctgInfo = await subCategories.find({
            ctg_associaton: ctgName
        });
        return ctgInfo;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.updateSubCategoryMapLinkToSubCategory = async function (subCtgName, subCategoryData) {
    let subCategory;
    try {
        subCategory = await subCategories.findOneAndUpdate({
            sub_ctg_name: subCtgName
        }, subCategoryData);
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}