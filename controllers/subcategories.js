var subCategoriesHandler = require('../modelsWrapper/subcategories');

module.exports.createSubCategory = async function  (subCtgName, orderNumber, sub_ctg_list_assoc) {
    let subCategoryInfoCreated;
    try {
        subCategoryInfoCreated = await subCategoriesHandler.createCategorySubCategoryMap(subCtgName, orderNumber, sub_ctg_list_assoc);
        if (subCategoryInfoCreated) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.mapCategoryToSubCategory = async function (subCtgName, ctgName) {
    let mapValue;
    try {
        mapValue = await subCategoriesHandler.mapCategoryToSubCategory(subCtgName, ctgName);
        if (mapValue) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.deleteSubCategory = async function (subCtgName) {
    let subCategoriesInfo;
    try {
        subCategoriesInfo = await subCategoriesHandler.deleteSubCategoryByName(subCtgName);
        if (subCategoriesInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.getAllSubCategories = async function () {
    let subCategoriesInfo;
    try {
        subCategoriesInfo = await subCategoriesHandler.getAllSubCategories();
    } catch (err) {
        console.log(err);
    }
    return subCategoriesInfo;
}

module.exports.getSubCategoryByName = async function (ctgName) {
    let subCategoriesInfo;
    try {
        subCategoriesInfo = await subCategoriesHandler.findSubCategoryByName(ctgName);
    } catch (err) {
        console.log(err);
    }
    return subCategoriesInfo;
}

module.exports.getSubCategoryByCategory = async function (ctgName) {
    let subCategoriesInfo;
    try {
        subCategoriesInfo = await subCategoriesHandler.findSubCategoryByCategory(ctgName);
    } catch (err) {
        console.log(err);
    }
    return subCategoriesInfo;
}

module.exports.unlinkCategoryFromSubCategory = async function (subctgname, ctgname) {
    let unlinkValue;
    try {
        unlinkValue = await subCategoriesHandler.unlinkCategoryFromSubCategory(subctgname, ctgname);
        if (unlinkValue) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.updateSubCategoryMapLinkToSubCategory = async function (subCtgName, data) {
    let subCategoryInfoUpdated;
    try {
        subCategoryInfoUpdated = await subCategoriesHandler.updateSubCategoryMapLinkToSubCategory(subCtgName, data);
        if (subCategoryInfoUpdated) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}