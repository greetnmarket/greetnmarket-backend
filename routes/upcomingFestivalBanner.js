var express = require('express');
var router = express.Router();
var upcomingFestivalBannerController = require('../controllers/upcomingFestivalBanner');
var bannerpicUploader = require('../utils/image-video-processor').uploadBannerPicture;
var responseConstants = require('../responses/upcomingFestivalBanner');

// For users
router.get('/', async function(req, res, next) {
    let response;
    try {
        let upcomingFestivalBannerInfo = await upcomingFestivalBannerController.getNonExpiredImgOfupcomingFestivalBanner();
        if (upcomingFestivalBannerInfo) {
            response = responseConstants.constants.allImageOfUpcomingFestivalBannerReceived;
            response.data = upcomingFestivalBannerInfo;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetImageOfUpcomingFestivalBanners;
    return res.status(response.status).send(response);
});

// For admin console
router.get('/all', async function(req, res, next) {
    let response;
    try {
        let upcomingFestivalBannerInfo = await upcomingFestivalBannerController.getAllImgOfupcomingFestivalBanner();
        if (upcomingFestivalBannerInfo) {
            response = responseConstants.constants.allImageOfUpcomingFestivalBannerReceived;
            response.data = upcomingFestivalBannerInfo;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetImageOfUpcomingFestivalBanners;
    return res.status(response.status).send(response);
});

router.post('/', bannerpicUploader.single('picture'), async function(req, res, next) {
    let response;
    try {
        let upcomingFestivalBannerImageData = {
            imgName: req.file.key,
            subCtgName: req.body.subctgname,
            from: req.body.from,
            to: req.body.to,
            orderNo: req.body.orderNo
        }
        let upcomingFestivalBannerInfo = await upcomingFestivalBannerController.createUpcomingFestivalBannerImageMapping(upcomingFestivalBannerImageData);
        if (upcomingFestivalBannerInfo) {
            response = responseConstants.constants.imageUpcomingFestivalBannerMapped;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToMapImgAndUpcomingFestivalBanner;
    return res.status(response.status).send(response);
});

router.delete('/:name', async function(req, res, next) {
    let response;
    try {
        let imgName = req.params.name;
        let banner = await upcomingFestivalBannerController.deleteImgFromUpcomingFestivalBannerByName(imgName);
        if (banner) {
            response = responseConstants.constants.imageUnlinkedFromUpcomingFestivalBanner;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToUnlinkImgAndUpcomingFestivalBanner;
    return res.status(response.status).send(response);
});

module.exports = router;