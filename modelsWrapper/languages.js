const Languages = require("../models/languages");

module.exports.getAllLanguages = async function () {
    let allLanguages;
    try {
        allLanguages = await Languages.find();
    } catch (err) {
        console.log(err);
    }
    return allLanguages;
}

module.exports.deleteLanguagesByName = async function (langName) {
    let languages;
    try {
        languages = await Languages.deleteOne({
            lang_name: langName
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.createLanguage = async function (langName) {
    let languages;
    try {
        languages = await Languages.create({
            lang_name: langName
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}