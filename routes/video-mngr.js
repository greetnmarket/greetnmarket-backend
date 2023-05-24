var express = require('express');
var router = express.Router();
var commonVideoUploader = require('../utils/image-video-processor').uploadCommonVideo;
var videoMngrController = require('../controllers/video-mngr');
var responseConstants = require('../responses/video-mngr');
const { getCommonVideo } = require('../utils/image-video-processor');

router.post('/commonvideo', commonVideoUploader.single('video'), async function (req, res, next) {
    try {
        console.log(req.file);
        let commonVidCreation = await videoMngrController.createCommonVideo(req.file.key);
        if (commonVidCreation) {
            let response = responseConstants.constants.commonvideocreated;
            response.location = req.file.location;
            response.key = req.file.key;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.commonvideocreationfailed;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

router.post('/subctgvideomap', async function (req, res, next) {
    try {
        let subCtgImgMap = await videoMngrController.mapSubCategoryToVideo(req.body.videoname, req.body.subctgname);
        if (subCtgImgMap) {
            let response = responseConstants.constants.subCtgVideoMapCreated;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.subCtgVideoMapFailed;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

router.post('/langvideomap', async function (req, res, next) {
    try {
        let langImgMap = await videoMngrController.mapLanguageToImage(req.body.videoname, req.body.lang);
        if (langImgMap) {
            let response = responseConstants.constants.langVideoMapCreated;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.langVideoMapFailed;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

router.post('/subctgvideounlink', async function (req, res, next) {
    try {
        let subCtgImgMap = await videoMngrController.unlinkSubCategoryFromVideo(req.body.videoname, req.body.subctgname);
        if (subCtgImgMap) {
            let response = responseConstants.constants.subCtgVideoMapUnlinked;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.subCtgVideoUnlinkFailed;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

router.post('/langvideounlink', async function (req, res, next) {
    try {
        let langImgMap = await videoMngrController.unlinkLanguageFromVideo(req.body.videoname, req.body.lang);
        if (langImgMap) {
            let response = responseConstants.constants.langVideoMapUnlinked;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.langVideoUnlinkFailed;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

router.get('/getcommonvideo', async function (req, res, next) {
    try {
        let videoInfo = await videoMngrController.getAllCommonVideo();
        if (videoInfo) {
            let response = responseConstants.constants.videoInformationReceived;
            response.data = videoInfo;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.unableToGetVideoInfo;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

router.get('/getpublicvideobyname/:name', async function (req, res, next) {
    try {
        let videoInfo = await videoMngrController.getVideoByName(req.params.name);
        if (videoInfo) {
            // Updating the video name with temporary url for getting the image
            videoInfo.video_name = await getCommonVideo(req.params.name);
            let response = responseConstants.constants.videoInformationReceived;
            response.data = videoInfo;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.unableToGetVideoInfo;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

// This is for getting public image by sub category
router.get('/getpublicvideobysubctg/:subctgname', async function (req, res, next) {
    try {
        let ctgInfo = await videoMngrController.getVideoBySubCategory(req.params.subctgname);
        if (ctgInfo) {
            let response = responseConstants.constants.videoInformationBySubCategoryReceived;
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

// This is for getting public video by sub category and language
router.get('/getpublicvideobysubctg/:subctgname/:lang', async function (req, res, next) {
    try {
        let ctgInfo = await videoMngrController.getVideoBySubCategoryAndLang(req.params.subctgname, req.params.lang);
        if (ctgInfo) {
            let response = responseConstants.constants.videoInformationBySubCategoryAndLangReceived;
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

module.exports = router;