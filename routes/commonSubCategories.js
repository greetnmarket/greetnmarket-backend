var express = require('express');
var router = express.Router();
var commonSubCtgController = require('../controllers/commonSubCategories');
var responseConstants = require('../responses/commonSubCategories');

// Get all banners info
router.get('/all', async function(req, res, next) {
    let response;
    try {
        let cmnSubCtg = await commonSubCtgController.getAllCommonSubCateogry();
        if (cmnSubCtg) {
            response = responseConstants.constants.allCommonSubCategoriesReceived;
            response.data = cmnSubCtg;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetCommonSubCategories;
    return res.status(response.status).send(response);
});

// Get banner info by name
router.get('/:name', async function(req, res, next) {
    let response;
    try {
        let subctg_name = req.params.name;
        let cmnSubCtg = await commonSubCtgController.findCommonSubCategoryByName(subctg_name);
        if (cmnSubCtg) {
            response = responseConstants.constants.allCommonSubCategoriesReceived;
            response.data = cmnSubCtg;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetCommonSubCategories;
    return res.status(response.status).send(response);
});

router.post('/', async function(req, res, next) {
    let response;
    try {
        let cmnSubCtgData = {
            subctg_name: req.body.name,
            enabled: req.body.enabled,
            orderNo: req.body.orderNo,
            cmn_sub_ctg_list_assoc: req.body.cmn_sub_ctg_list_assoc
        }
        let cmnSubCtg = await commonSubCtgController.createCommonSubCategory(cmnSubCtgData);
        if (cmnSubCtg) {
            response = responseConstants.constants.commonSubCategoriesNameCreated;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToCreateCommonSubCategories;
    return res.status(response.status).send(response);
});

router.post('/updatecmnsubctg', async function(req, res, next) {
    let response;
    try {
        let cmnSubCtgData = {
            subctg_name: req.body.name
        }
        if (req.body.hasOwnProperty('enabled')) {
            cmnSubCtgData.enabled = req.body.enabled
        }
        if (req.body.hasOwnProperty('cmn_sub_ctg_list_assoc')) {
            cmnSubCtgData.cmn_sub_ctg_list_assoc = req.body.cmn_sub_ctg_list_assoc
        }
        let cmnSubCtg = await commonSubCtgController.updateCommonSubCateogryInfo(cmnSubCtgData);
        if (cmnSubCtg) {
            response = responseConstants.constants.commonSubCategoriesUpdated;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToUpdateCommonSubCategories;
    return res.status(response.status).send(response);
});

router.delete('/:name', async function(req, res, next) {
    let response;
    try {
        let subctg_name = req.params.name;
        let cmnSubCtg = await commonSubCtgController.deleteCommonSubCategoryByName(subctg_name);
        if (cmnSubCtg) {
            response = responseConstants.constants.commonSubCategoriesNameDeleted;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToDeleteCommonSubCategories;
    return res.status(response.status).send(response);
});

module.exports = router;