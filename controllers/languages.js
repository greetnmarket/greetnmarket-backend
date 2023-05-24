var languagesHandler = require('../modelsWrapper/languages');

module.exports.getAllLanguages = async function () {
    let languagesInfo;
    try {
        languagesInfo = await languagesHandler.getAllLanguages();
    } catch (err) {
        console.log(err);
    }
    return languagesInfo;
}

module.exports.deleteLanguage = async function (langName) {
    let languagesInfo;
    try {
        languagesInfo = await languagesHandler.deleteLanguagesByName(langName);
        if (languagesInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.createLanguage = async function (langName) {
    let languages;
    try {
        languages = await languagesHandler.createLanguage(langName);
        if (languages) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}