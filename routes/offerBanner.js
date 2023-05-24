var express = require('express');
var router = express.Router();
var offerBannerController = require('../controllers/offerBanner');
var bannerpicUploader = require('../utils/image-video-processor').uploadBannerPicture;
var responseConstants = require('../responses/offerBanner');

router.get('/', async function(req, res, next) {
    let response;
    try {
        let offerBannerImageInfo = await offerBannerController.getAllImgOfOfferBanner();
        if (offerBannerImageInfo) {
            response = responseConstants.constants.allImageOfOfferBannerReceived;
            response.data = offerBannerImageInfo;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetImageOfOfferBanners;
    return res.status(response.status).send(response);
});

router.post('/', bannerpicUploader.single('picture'), async function(req, res, next) {
    let response;
    try {
        let imgName = req.file.key;
        let orderNumber = req.body.orderNo;
        let offerBannerImageInfo = await offerBannerController.createOfferBannerImageMapping(imgName, orderNumber);
        if (offerBannerImageInfo) {
            response = responseConstants.constants.imageOfferBannerMapped;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToMapImgAndOfferBanner;
    return res.status(response.status).send(response);
});

router.delete('/:name', async function(req, res, next) {
    let response;
    try {
        let imgName = req.params.name;
        let banner = await offerBannerController.deleteImgFromOfferBannerByName(imgName);
        if (banner) {
            response = responseConstants.constants.imageUnlinkedFromOfferBanner;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToUnlinkImgAndOfferBanner;
    return res.status(response.status).send(response);
});

module.exports = router;