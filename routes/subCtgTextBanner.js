var express = require('express');
const { verifyAccessTokenMiddleWare } = require('../controllers/auth');
var router = express.Router();
var subCtgTxtBnrController = require('../controllers/subCtgTextBanner');
const responseConstants = require('../responses/subCtgTextBanner');

// Get all sub categories mapped to text banner
router.get('/', async function(req, res, next) {
    let response;
    try {
        let textBannerSubCategory = await subCtgTxtBnrController.getAllTextBannerSubCategory();
        if (textBannerSubCategory) {
            response = responseConstants.constants.allSubCategoryTextBannerRetreived;
            response.data = textBannerSubCategory;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unabledToGetSubCtgTxtBanner;
    return res.status(response.status).send(response);
});

router.post('/', async function(req, res, next) {
    let response;
    try {
        let name = req.body.name;
        let subCtgName = req.body.sub_ctg_name;
        let orderNumber = req.body.orderNo;
        let textBannerSubCategory = await subCtgTxtBnrController.addSubCateogryToTextBanner(name, subCtgName, orderNumber);
        if (textBannerSubCategory) {
            response = responseConstants.constants.subCategoryAddedToTextBanner;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unabledToAddSubCtgToTxtBanner;
    return res.status(response.status).send(response);
});

router.delete('/:name', async function(req, res, next) {
    let response;
    try {
        let name = req.params.name;
        let textBannerSubCategory = await subCtgTxtBnrController.deleteSubCategoryFromTextBannerByName(name);
        if (textBannerSubCategory) {
            response = responseConstants.constants.subCategoryTextBannerUnlinkSuccessfully;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unabledToUnlinkSubCtgToTxtBanner;
    return res.status(response.status).send(response);
});

module.exports = router;