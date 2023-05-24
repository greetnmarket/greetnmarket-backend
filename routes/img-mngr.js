var express = require('express');
var router = express.Router();
var profilepicUploader = require('../utils/image-video-processor').uploadProfilePicture;
var businesspicUploader = require('../utils/image-video-processor').uploadBusinessPicture;
var commonpicUploader = require('../utils/image-video-processor').uploadCommonPicture;
var getCommonPicture = require('../utils/image-video-processor').getCommonPicture;
var userpicUploader = require('../utils/image-video-processor').uploadUserSpecificPicture;
var imgMngrController = require('../controllers/img-mngr');
var profileController = require('../controllers/profile');
var responseConstants = require('../responses/img-mngr');
var verifyAccessTokenMiddleWare = require('../controllers/auth').verifyAccessTokenMiddleWare;

router.post('/profilepic', verifyAccessTokenMiddleWare, profilepicUploader.single('picture'), async function (req, res, next) {
    try {
        console.log(req.headers, req.file);
        let updateProfilePicUrl = await imgMngrController.updateProfilePicture(req.headers.phone_number, req.file.location);
        if (updateProfilePicUrl) {
            let response = responseConstants.constants.profilepicupdated;
            response.location = req.file.location;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.profilepicupdatefailed;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

router.post('/businesspic', verifyAccessTokenMiddleWare, businesspicUploader.single('picture'), async function (req, res, next) {
    try {
        console.log(req.headers.phone_number, req.file);
        let updateProfilePicUrl = await imgMngrController.updateBusinessPicture(req.headers.phone_number, req.file.location);
        if (updateProfilePicUrl) {
            let response = responseConstants.constants.businesspicupdated;
            response.location = req.file.location;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.businesspicupdatefailed;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

// Upload pictures through this route and map with the category we have created
// Admin Api so commenting it as of now

router.post('/commonpic', commonpicUploader.single('picture'), async function (req, res, next) {
    try {
        console.log(req.file);
        let commonPicCreation = await imgMngrController.createCommonPicture(req.file.key);
        if (commonPicCreation) {
            let response = responseConstants.constants.commonpiccreated;
            response.location = req.file.location;
            response.key = req.file.key;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.commonpiccreationfailed;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});


router.post('/userspecific',verifyAccessTokenMiddleWare, userpicUploader.single('picture'), async function (req, res, next) {
    try {
        console.log(req.file);
        let phoneNumber = req.headers.phone_number;
        let userSpecificPicCreation = await imgMngrController.createUserSpecificPicture(req.file.key, phoneNumber);
        let userDownloadedImgCount = await profileController.incrementImgDownloadedCount(phoneNumber);
        if (userSpecificPicCreation && userDownloadedImgCount) {
            let response = responseConstants.constants.userSpecificPiccreated;
            response.location = req.file.location;
            response.key = req.file.key;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.userSpecificPicCreationfailed;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

// Mapping a picture to a category to make it avaialble for that category
// Admin Api so commenting it as of now

router.post('/subctgimgmap', async function (req, res, next) {
    try {
        let subCtgImgMap = await imgMngrController.mapSubCategoryToImage(req.body.imgname, req.body.subctgname);
        if (subCtgImgMap) {
            let response = responseConstants.constants.subCtgImgMapCreated;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.subCtgImgMapFailed;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

router.post('/subctgimgunlink', async function (req, res, next) {
    try {
        let subCtgImgMap = await imgMngrController.unlinkSubCategoryFromImage(req.body.imgname, req.body.subctgname);
        if (subCtgImgMap) {
            let response = responseConstants.constants.subCtgImgMapUnlinked;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.subCtgImgUnlinkFailed;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});


// This is for getting public image by name
router.get('/getpublicimgbyname/:name', async function (req, res, next) {
    try {
        let imgInfo = await imgMngrController.getImgByName(req.params.name);
        if (imgInfo) {
            // Updating the image name with temporary url for getting the image
            imgInfo.img_name = await getCommonPicture(req.params.name);
            let response = responseConstants.constants.imgInformationReceived;
            response.data = imgInfo;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.unableToGetImgInfo;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

// This is for getting public image by sub category
router.get('/getpublicimgbysubctg/:subctgname', async function (req, res, next) {
    try {
        let ctgInfo = await imgMngrController.getImgBySubCategory(req.params.subctgname);
        if (ctgInfo) {
            let response = responseConstants.constants.imgInformationBySubCategoryReceived;
            response.data = ctgInfo;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.unableToGetSubCategoryInfo;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

// This is for getting public image by sub category and language
router.get('/getpublicimgbysubctg/:subctgname/:lang', async function (req, res, next) {
    try {
        let ctgInfo = await imgMngrController.getImgBySubCategoryAndLang(req.params.subctgname, req.params.lang);
        if (ctgInfo) {
            let response = responseConstants.constants.imgInformationBySubCategoryAndLangReceived;
            response.data = ctgInfo;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.unableToGetSubCategoryAndLangInfo;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

router.post('/langimgmap', async function (req, res, next) {
    try {
        let langImgMap = await imgMngrController.mapLanguageToImage(req.body.imgname, req.body.lang);
        if (langImgMap) {
            let response = responseConstants.constants.langImgMapCreated;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.langImgMapFailed;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

router.post('/langimgunlink', async function (req, res, next) {
    try {
        let langImgMap = await imgMngrController.unlinkLanguageFromImage(req.body.imgname, req.body.lang);
        if (langImgMap) {
            let response = responseConstants.constants.langImgMapUnlinked;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.langImgUnlinkFailed;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

// This is for getting all common pictures by admin for mapping APIs
router.get('/getcommonpic', async function (req, res, next) {
    console.log("988888888888888888888888")
    try {
        let imgInfo = await imgMngrController.getAllCommonImage();
        if (imgInfo) {
            let response = responseConstants.constants.imgInformationReceived;
            response.data = imgInfo;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.unableToGetImgInfo;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

// This is for getting all user specific pictures (right now the downloaded pictures of the user)
router.get('/userspecific', verifyAccessTokenMiddleWare, async function (req, res, next) {
    try {
        let phoneNumber = req.headers.phone_number;
        let imgInfo = await imgMngrController.getAllUserSpecificImage(phoneNumber);
        if (imgInfo) {
            let response = responseConstants.constants.imgInformationReceived;
            response.data = imgInfo;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.unableToGetImgInfo;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

module.exports = router;