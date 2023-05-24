const vidMngr = require('../models/video-mngr');

module.exports.createCommonVideoMap = async function (videoName) {
    let videoCreated;
    try {
        videoCreated = await vidMngr.create({
            video_name: videoName
        });
        return true;
    } catch(err) {
        console.log(err);
    }
    return false;
}

module.exports.mapSubCategoryToVideo = async function (videoName, subCtgName) {
    let videoInfo;
    try {
        videoInfo = await vidMngr.findOneAndUpdate({
            video_name: videoName
        }, {
            $addToSet: {
                sub_ctg_associaton: subCtgName
            }
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.mapLanguageToVideo = async function (videoName, langName) {
    let videoInfo;
    try {
        videoInfo = await vidMngr.findOneAndUpdate({
            video_name: videoName
        }, {
            lang_association: langName
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.unlinkSubCategoryFromVideo = async function (videoName, subCtgName) {
    let updateVideoSubAssoc;
    try {
        updateVideoSubAssoc = await vidMngr.findOneAndUpdate({
            video_name: videoName
        }, {
            $pull: {
                sub_ctg_associaton: subCtgName
            } 
        });
        if (updateVideoSubAssoc) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.unlinkLanguageFromVideo = async function (videoName, langName) {
    let updateVideoSubAssoc;
    try {
        updateVideoSubAssoc = await vidMngr.findOneAndUpdate({
            video_name: videoName
        }, {
            lang_association: ''
        });
        if (updateVideoSubAssoc) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.getAllCommonVideo = async function () {
    let videoInfo;
    try {
        videoInfo = await vidMngr.find();
    } catch (err) {
        console.log(err);
    }
    return videoInfo;
}

module.exports.getVideoByName = async function (videoName) {
    let videoInfo;
    try {
        videoInfo = await vidMngr.findOne({
            video_name: videoName
        });
    } catch (err) {
        console.log(err);
    }
    return videoInfo;
}

module.exports.getVideoBySubCategory = async function (subCtgName) {
    let subCtgInfo;
    try {
        subCtgInfo = await vidMngr.find({
            sub_ctg_associaton: subCtgName
        },{ 
            video_name:1 ,
            _id: 0
        });
        return subCtgInfo;
    } catch (err) {
        console.log(err);
    }
    return subCtgInfo;
}

module.exports.getVideoBySubCategoryAndLang = async function (subCtgName, langName) {
    let subCtgInfo;
    try {
        subCtgInfo = await vidMngr.find({
            sub_ctg_associaton: subCtgName,
            lang_association: langName
        },{ 
            video_name:1 ,
            _id: 0
        });
        return subCtgInfo;
    } catch (err) {
        console.log(err);
    }
    return subCtgInfo;
}