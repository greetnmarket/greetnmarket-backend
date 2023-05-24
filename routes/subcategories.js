var express = require('express');
const { verifyAccessTokenMiddleWare } = require('../controllers/auth');
var router = express.Router();
var subCategoryController = require('../controllers/subcategories');
const responseConstants = require('../responses/subcategories');

// Get all sub categories used by all users
router.get('/all', async function(req, res, next) {
    let response;
    try {
        let categories = await subCategoryController.getAllSubCategories();
        console.log(categories);
        if (categories) {
            response = responseConstants.constants.allsubCategoriesReceived;
            response.data = categories;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetsubCategories;
    return res.status(response.status).send(response);
});
// Creating subcategory admin panel stuff

router.post('/', async function(req, res, next) {
    let response;
    try {
        let subCtgName = req.body.name;
        let orderNumber = req.body.orderNo;
        let sub_ctg_list_assoc = req.body.sub_ctg_list_assoc;
        let subCategory = await subCategoryController.createSubCategory(subCtgName, orderNumber, sub_ctg_list_assoc);
        if (subCategory) {
            response = responseConstants.constants.subCategoryNameCreated;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToCreatesubCategories;
    return res.status(response.status).send(response);
});

router.post('/updatesubsctglinks', async function(req, res, next) {
    let response;
    try {
        let subCtgName = req.body.name;
        let data = {};
        if (req.body.hasOwnProperty('sub_ctg_list_assoc')) {
            data.sub_ctg_list_assoc = req.body.sub_ctg_list_assoc;
        }
        let subCategory = await subCategoryController.updateSubCategoryMapLinkToSubCategory(subCtgName, data);
        if (subCategory) {
            response = responseConstants.constants.subCategoryNameUpdated;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToUpdatesubCategories;
    return res.status(response.status).send(response);
});

// Deleting a category admin panel usage so commenting it out as of now

router.delete('/:name', async function(req, res, next) {
    let response;
    try {
        let ctgName = req.params.name;
        let category = await subCategoryController.deleteSubCategory(ctgName);
        if (category) {
            response = responseConstants.constants.subCategoryNameDeleted;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToDeletesubCategories;
    return res.status(response.status).send(response);
});

router.get('/:name', async function(req, res, next) {
    let response;
    try {
        let subCtgName = req.params.name;
        let category = await subCategoryController.getSubCategoryByName(subCtgName);
        if (category) {
            response = responseConstants.constants.allsubCategoriesReceived;
            response.data = category;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetsubCategories;
    return res.status(response.status).send(response);
});


// Mapping a category to a subcategory to make it avaialble for that sub category
// Admin Api so commenting it as of now

router.post('/ctgsubctgmap', async function (req, res, next) {
    try {
        let ctgsubctgmap = await subCategoryController.mapCategoryToSubCategory(req.body.subctgname, req.body.ctgname);
        if (ctgsubctgmap) {
            let response = responseConstants.constants.ctgSubCtgMapCreated;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.ctgSubCtgMapFailed;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

router.post('/ctgsubctgunlink', async function (req, res, next) {
    try {
        let ctgsubctgmap = await subCategoryController.unlinkCategoryFromSubCategory(req.body.subctgname, req.body.ctgname);
        if (ctgsubctgmap) {
            let response = responseConstants.constants.ctgSubCtgUnlinked;
            return res.status(response.status).send(response);
        }
        let response = responseConstants.constants.ctgSubCtgUnlinkFailed;
        return res.status(response.status).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

// Get all sub categories used by all users
router.get('/byctg/:name', async function(req, res, next) {
    let response;
    try {
        let categories = await subCategoryController.getSubCategoryByCategory(req.params.name);
        if (categories) {
            response = responseConstants.constants.subCategoriesForCtgReceived;
            response.data = categories;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetsubCategories;
    return res.status(response.status).send(response);
});

module.exports = router;