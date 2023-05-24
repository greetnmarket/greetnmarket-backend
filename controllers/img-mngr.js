var profileHandler = require('../modelsWrapper/profile');
var imgMngrHandler = require('../modelsWrapper/img-mngr');
const { getCommonPicture, getUserSpecificPicture } = require('../utils/image-video-processor');

module.exports.updateProfilePicture = async function (phone_number, profilePicUrl) {
    let updatedProfile;
    try {
        let data = {
            phonenumber: phone_number,
            profile_pic_url: profilePicUrl
        }
        updatedProfile = await profileHandler.updateProfile(data);
        if (updatedProfile) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.updateBusinessPicture = async function (phone_number, businessPicUrl) {
    let updatedProfile;
    try {
        let data = {
            phonenumber: phone_number,
            business_pic_url: businessPicUrl
        }
        updatedProfile = await profileHandler.updateProfile(data);
        if (updatedProfile) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.createCommonPicture = async function  (picFileName) {
    let picInfoCreated;
    try {
        picInfoCreated = await imgMngrHandler.createCommonPictureMap(picFileName);
        if (picInfoCreated) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.createUserSpecificPicture = async function  (picFileName, userInfo) {
    let picInfoCreated;
    try {
        picInfoCreated = await imgMngrHandler.createUserPictureMap(picFileName, userInfo);
        if (picInfoCreated) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.mapSubCategoryToImage = async function (imgName, subCtgName) {
    let mapValue;
    try {
        mapValue = await imgMngrHandler.mapSubCategoryToImg(imgName, subCtgName);
        if (mapValue) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.mapLanguageToImage = async function (imgName, langName) {
    let mapValue;
    try {
        mapValue = await imgMngrHandler.mapLanguageToImg(imgName, langName);
        if (mapValue) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.unlinkSubCategoryFromImage = async function (imgName, subCtgName) {
    let unlinkValue;
    try {
        unlinkValue = await imgMngrHandler.unlinkSubCategoryFromImage(imgName, subCtgName);
        if (unlinkValue) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.unlinkLanguageFromImage = async function (imgName, langName) {
    let unlinkValue;
    try {
        unlinkValue = await imgMngrHandler.unlinkLanguageFromImage(imgName, langName);
        if (unlinkValue) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.getImgByName = async function (imgName) {
    let imgInfo;
    try {
        imgInfo = await imgMngrHandler.getImgByName(imgName);
    } catch (err) {
        console.log(err);
    }
    return imgInfo;
}

module.exports.getAllCommonImage = async function () {
    let imgInfo;
    let imgDecodedInfo;
    try {
        imgInfo = await imgMngrHandler.getAllCommonImage();
        if (imgInfo) {
            imgDecodedInfo = [];
            for await(let i of imgInfo) {
                if (i.img_name) {
                    i.image_url = await getCommonPicture(i.img_name);
                    imgDecodedInfo.push({
                        img_name: i.img_name,
                        image_url: i.image_url,
                        association: i.sub_ctg_associaton
                    });
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
    return imgDecodedInfo;
}

module.exports.getAllUserSpecificImage = async function (phoneNumber) {
    let imgInfo;
    let imgDecodedInfo;
    try {
        imgInfo = await imgMngrHandler.getAllUserSpecificImage(phoneNumber);
        if (imgInfo) {
            imgDecodedInfo = [];
            for await(let i of imgInfo) {
                if (i.img_name) {
                    i.image_url = await getUserSpecificPicture(i.img_name);
                    imgDecodedInfo.push({
                        img_name: i.img_name,
                        image_url: i.image_url
                    });
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
    return imgDecodedInfo;
}

module.exports.getImgBySubCategory = async function (subCtgName) {
    let subCtgInfo;
    let subCategoryDecodedInfo;
    try {
        subCtgInfo = await imgMngrHandler.getImgBySubCategory(subCtgName);
        if (subCtgInfo) {
            subCategoryDecodedInfo = [];
            for await(let i of subCtgInfo) {
                if (i.img_name) {
                    i.image_url = await getCommonPicture(i.img_name);
                    subCategoryDecodedInfo.push({
                        img_name: i.img_name,
                        image_url: i.image_url
                    });
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
    return subCategoryDecodedInfo;
}

module.exports.getImgBySubCategoryAndLang = async function (subCtgName, langName) {
    let subCtgInfo;
    let subCategoryDecodedInfo;
    try {
        subCtgInfo = await imgMngrHandler.getImgBySubCategoryAndLang(subCtgName, langName);
        if (subCtgInfo) {
            subCategoryDecodedInfo = [];
            for await(let i of subCtgInfo) {
                if (i.img_name) {
                    i.image_url = await getCommonPicture(i.img_name);
                    subCategoryDecodedInfo.push({
                        img_name: i.img_name,
                        image_url: i.image_url
                    });
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
    return subCategoryDecodedInfo;
}