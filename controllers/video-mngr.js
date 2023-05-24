var commonVideoHandler = require('../modelsWrapper/video-mngr');
const { getCommonVideo } = require('../utils/image-video-processor');

module.exports.createCommonVideo = async function  (videoFileName) {
    let vidoeInfoCreated;
    try {
        vidoeInfoCreated = await commonVideoHandler.createCommonVideoMap(videoFileName);
        if (vidoeInfoCreated) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.mapSubCategoryToVideo = async function (videoName, subCtgName) {
    let mapValue;
    try {
        mapValue = await commonVideoHandler.mapSubCategoryToVideo(videoName, subCtgName);
        if (mapValue) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.mapLanguageToImage = async function (videoName, langName) {
    let mapValue;
    try {
        mapValue = await commonVideoHandler.mapLanguageToVideo(videoName, langName);
        if (mapValue) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.unlinkSubCategoryFromVideo = async function (videoName, subCtgName) {
    let unlinkValue;
    try {
        unlinkValue = await commonVideoHandler.unlinkSubCategoryFromVideo(videoName, subCtgName);
        if (unlinkValue) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.unlinkLanguageFromVideo = async function (videoName, langName) {
    let unlinkValue;
    try {
        unlinkValue = await commonVideoHandler.unlinkLanguageFromVideo(videoName, langName);
        if (unlinkValue) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.getAllCommonVideo = async function () {
    let videoInfo;
    let videoDecodedInfo;
    try {
        videoInfo = await commonVideoHandler.getAllCommonVideo();
        if (videoInfo) {
            videoDecodedInfo = [];
            for await(let i of videoInfo) {
                if (i.video_name) {
                    i.video_url = await getCommonVideo(i.video_name);
                    videoDecodedInfo.push({
                        video_name: i.video_name,
                        video_url: i.video_url,
                        association: i.sub_ctg_associaton
                    });
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
    return videoDecodedInfo;
}

module.exports.getVideoByName = async function (videoName) {
    let videoInfo;
    try {
        videoInfo = await commonVideoHandler.getVideoByName(videoName);
    } catch (err) {
        console.log(err);
    }
    return videoInfo;
}

module.exports.getVideoBySubCategory = async function (subCtgName) {
    let subCtgInfo;
    let subCategoryDecodedInfo;
    try {
        subCtgInfo = await commonVideoHandler.getVideoBySubCategory(subCtgName);
        if (subCtgInfo) {
            subCategoryDecodedInfo = [];
            for await(let i of subCtgInfo) {
                if (i.video_name) {
                    i.video_url = await getCommonVideo(i.video_name);
                    subCategoryDecodedInfo.push({
                        video_name: i.video_name,
                        video_url: i.video_url
                    });
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
    return subCategoryDecodedInfo;
}

module.exports.getVideoBySubCategoryAndLang = async function (subCtgName, langName) {
    let subCtgInfo;
    let subCategoryDecodedInfo;
    try {
        subCtgInfo = await commonVideoHandler.getVideoBySubCategoryAndLang(subCtgName, langName);
        if (subCtgInfo) {
            subCategoryDecodedInfo = [];
            for await(let i of subCtgInfo) {
                if (i.video_name) {
                    i.video_url = await getCommonVideo(i.video_name);
                    subCategoryDecodedInfo.push({
                        video_name: i.video_name,
                        video_url: i.video_url
                    });
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
    return subCategoryDecodedInfo;
}