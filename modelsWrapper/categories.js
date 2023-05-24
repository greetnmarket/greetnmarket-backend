const Categories = require("../models/categories");

module.exports.getAllCategories = async function () {
    let allCategories;
    try {
        allCategories = await Categories.find();
    } catch (err) {
        console.log(err);
    }
    return allCategories;
}

module.exports.findCategoryByName = async function (ctgName) {
    let category;
    try {
        category = await Categories.findOne({
            ctg_name: ctgName
        });
    } catch (err) {
        console.log(err);
    }
    return category;
}

module.exports.deleteCategoryByName = async function (ctgName) {
    let category;
    try {
        category = await Categories.deleteOne({
            ctg_name: ctgName
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.renameCategoryName = async function (oldCtgName, newCtgName) {
    let category;
    try {
        category = await Categories.findOneAndUpdate({
            ctg_name: oldCtgName
        }, {
            ctg_name: newCtgName
        });
        return true
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.createCategory = async function (ctgName) {
    let category;
    try {
        category = await Categories.create({
            ctg_name: ctgName
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}