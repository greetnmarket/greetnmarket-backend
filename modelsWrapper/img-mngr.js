const imgMnger = require('../models/img-mngr');

module.exports.createCommonPictureMap = async function (picName) {
    let picCreated;
    try {
        picCreated = await imgMnger.create({
            img_name: picName
        });
        return true;
    } catch(err) {
        console.log(err);
    }
    return false;
}

module.exports.createUserPictureMap = async function (picName, userInfo) {
    let picCreated;
    try {
        picCreated = await imgMnger.create({
            img_name: picName,
            user: userInfo
        });
        return true;
    } catch(err) {
        console.log(err);
    }
    return false;
}

module.exports.mapSubCategoryToImg = async function (imgName, subCtgName) {
    let imageInfo;
    try {
        imageInfo = await imgMnger.findOneAndUpdate({
            img_name: imgName
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

module.exports.mapLanguageToImg = async function (imgName, langName) {
    let imageInfo;
    try {
        imageInfo = await imgMnger.findOneAndUpdate({
            img_name: imgName
        }, {
            lang_association: langName
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.getImgByName = async function (imgName) {
    let imgInfo;
    try {
        imgInfo = await imgMnger.findOne({
            img_name: imgName
        });
    } catch (err) {
        console.log(err);
    }
    return imgInfo;
}

module.exports.getAllCommonImage = async function () {
    let imgInfo;
    try {
        imgInfo = await imgMnger.find({ 
            user: { 
                $not: { 
                    $exists: true
                } 
            } 
        });
    } catch (err) {
        console.log(err);
    }
    return imgInfo;
}

module.exports.getAllUserSpecificImage = async function (phoneNumber) {
    let imgInfo;
    try {
        imgInfo = await imgMnger.find({ 
            user: phoneNumber
        });
    } catch (err) {
        console.log(err);
    }
    return imgInfo;
}

module.exports.getImgBySubCategory = async function (subCtgName) {
    let ctgInfo;
    try {
        console.log(subCtgName)
        const query = { sub_ctg_associaton: { $in: subCtgName } };
        ctgInfo = await imgMnger.aggregate([
            { $match:{
            // sub_ctg_associaton:{ $regex: subCtgName } 
            sub_ctg_associaton:new RegExp(subCtgName, 'i')
        }},
        {$project:{ 
            img_name:1 ,
            _id: 0

        }
        }]
        // {
        // $project:{ 
        //     img_name:1 ,
        //     _id: 0

        // }}
        );
        console.log(ctgInfo,"testst")
        return ctgInfo;
    } catch (err) {
        console.log(err);
    }
    return ctgInfo;
}

module.exports.getImgBySubCategoryAndLang = async function (subCtgName, langName) {
    let ctgInfo;
    try {
        ctgInfo = await imgMnger.find({
            sub_ctg_associaton: subCtgName,
            lang_association: langName
        },{ 
            img_name:1 ,
            _id: 0
        });
        return ctgInfo;
    } catch (err) {
        console.log(err);
    }
    return ctgInfo;
}

module.exports.unlinkSubCategoryFromImage = async function (imgName, subCtgName) {
    let updateImgSubAssoc;
    try {
        updateImgSubAssoc = await imgMnger.findOneAndUpdate({
            img_name: imgName
        }, {
            $pull: {
                sub_ctg_associaton: subCtgName
            } 
        });
        if (updateImgSubAssoc) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.unlinkLanguageFromImage = async function (imgName, langName) {
    let updateImgSubAssoc;
    try {
        updateImgSubAssoc = await imgMnger.findOneAndUpdate({
            img_name: imgName
        }, {
            lang_association: ''
        });
        if (updateImgSubAssoc) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}