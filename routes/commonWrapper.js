var express = require('express');
var router = express.Router();
var commonHandler = require('../controllers/commonWrapper');
const responseConstants = require('../responses/commonWrapper');

router.put('/order/:type/:id/:number', async function(req, res, next) {
    let response;
    try {
        let changeObject = {
            type: req.params.type,
            id: req.params.id,
            orderNo: req.params.number
        }
        let type = changeObject.type;
        let orderChange = await commonHandler.updateOrderNumber(changeObject);
        if (orderChange) {
            switch (type) {
                case 'mainbanner': {
                    response = responseConstants.constants.mainBannerUpdated;
                    break;
                }
                case 'offerbanner': {
                    response = responseConstants.constants.offerBannerUpdated;
                    break;
                }
                case 'textbanner': {
                    response = responseConstants.constants.textBannerUpdated;
                    break;
                }
                case 'subcategory': {
                    response = responseConstants.constants.subCategoriesUpdated;
                    break;
                }
                case 'commonsubcategory': {
                    response = responseConstants.constants.commonSubCategoriesUpdated;
                    break;
                }
                case 'upcomingfestivalbanner': {
                    response = responseConstants.constants.upcomingFestivalBannerUpdated;
                    break;
                }
            }
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    switch (type) {
        case 'mainbanner': {
            response = responseConstants.constants.unableToUpdateMainBanner;
            break;
        }
        case 'offerbanner': {
            response = responseConstants.constants.unableToUpdateOfferBanner;
            break;
        }
        case 'textbanner': {
            response = responseConstants.constants.unableToUpdateTextBanner;
            break;
        }
        case 'subcategory': {
            response = responseConstants.constants.unableToUpdateSubCategories;
            break;
        }
        case 'commonsubcategory': {
            response = responseConstants.constants.unableToUpdateCommonSubCategories;
            break;
        }
        case 'upcomingfestivalbanner': {
            response = responseConstants.constants.unableToUpdateUpcomingFestivalBanner;
            break;
        }
    }
    return res.status(response.status).send(response);
});

module.exports = router;