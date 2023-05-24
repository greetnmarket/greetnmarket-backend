var categoriesHandler = require('../modelsWrapper/categories');

module.exports.getAllCategories = async function () {
    let categoriesInfo;
    try {
        categoriesInfo = await categoriesHandler.getAllCategories();
        console.log(categoriesInfo)
    } catch (err) {
        console.log(err);
    }
    return categoriesInfo;
}

module.exports.getCategoryByName = async function (ctgName) {
    let categoriesInfo;
    try {
        categoriesInfo = await categoriesHandler.findCategoryByName(ctgName);
    } catch (err) {
        console.log(err);
    }
    return categoriesInfo;
}

// Don't use it because we need to update in subcategories as well since it takes this name as well
module.exports.renameCategoryName = async function (oldCtgName, newCtgName) {
    let categoriesInfo;
    try {
        categoriesInfo = await categoriesHandler.renameCategoryName(oldCtgName, newCtgName);
        if (categoriesInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.deleteCategory = async function (ctgName) {
    let categoriesInfo;
    try {
        categoriesInfo = await categoriesHandler.deleteCategoryByName(ctgName);
        if (categoriesInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.createCategory = async function (ctgname) {
    let category;
    try {
        category = await categoriesHandler.createCategory(ctgname);
        if (category) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}