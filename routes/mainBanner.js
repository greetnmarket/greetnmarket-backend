var express = require('express');
var router = express.Router();
var mainBannerController = require('../controllers/mainBanner');
var bannerpicUploader = require('../utils/image-video-processor').uploadBannerPicture;
var responseConstants = require('../responses/mainBanner');

router.get('/', async function(req, res, next) {
    let response;
    try {
        let mainBannerImageInfo = await mainBannerController.getAllImgOfMainBanner();
        if (mainBannerImageInfo) {
            response = responseConstants.constants.allImageOfMainBannerReceived;
            response.data = mainBannerImageInfo;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetImageOfMainBanners;
    return res.status(response.status).send(response);
});

router.post('/', bannerpicUploader.single('picture'), async function(req, res, next) {
    let response;
    try {
        let mainBannerImageData = {
            imgName: req.file.key,
            subCtgName: req.body.subctgname,
            orderNo: req.body.orderNo
        }
        let mainBannerImageInfo = await mainBannerController.createMainBannerImageMapping(mainBannerImageData);
        if (mainBannerImageInfo) {
            response = responseConstants.constants.imageMainBannerMapped;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToMapImgAndMainBanner;
    return res.status(response.status).send(response);
});

router.delete('/:name', async function(req, res, next) {
    let response;
    try {
        let imgName = req.params.name;
        let banner = await mainBannerController.deleteImgFromMainBannerByName(imgName);
        if (banner) {
            response = responseConstants.constants.imageUnlinkedFromMainBanner;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToUnlinkImgAndMainBanner;
    return res.status(response.status).send(response);
});

module.exports = router;