var express = require('express');
var router = express.Router();
var categoriesController = require('../controllers/categories');
const responseConstants = require('../responses/categories');

// Get all categories used by all users
router.get('/all', async function(req, res, next) {
    let response;
    try {
        let categories = await categoriesController.getAllCategories();
        if (categories) {
            response = responseConstants.constants.allCategoriesReceived;
            response.data = categories;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetCategories;
    return res.status(response.status).send(response);
});


router.get('/:name', async function(req, res, next) {
    let response;
    try {
        let ctgName = req.params.name;
        let category = await categoriesController.getCategoryByName(ctgName);
        if (category) {
            response = responseConstants.constants.allCategoriesReceived;
            response.data = category;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetCategories;
    return res.status(response.status).send(response);
});

// Updating the category name admin panel usage so commenting it out as of now
// This shouldn't work since we are not having it relationally so don't use it as of now
router.put('/:oldname/:newname', async function(req, res, next) {
    let response;
    try {
        let oldCtgName = req.params.oldname;
        let newCtgName = req.params.newname;
        let category = await categoriesController.renameCategoryName(oldCtgName, newCtgName);
        if (category) {
            response = responseConstants.constants.categoryNameUpdated;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToUpdateCategories;
    return res.status(response.status).send(response);
});


// Deleting a category admin panel usage so commenting it out as of now

router.delete('/:name', async function(req, res, next) {
    let response;
    try {
        let ctgName = req.params.name;
        let category = await categoriesController.deleteCategory(ctgName);
        if (category) {
            response = responseConstants.constants.categoryNameDeleted;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToDeleteCategories;
    return res.status(response.status).send(response);
});


// Creating a category admin panel usage so commenting it out as of now

router.post('/', async function(req, res, next) {
    let response;
    try {
        let ctgName = req.body.name;
        let category = await categoriesController.createCategory(ctgName);
        if (category) {
            response = responseConstants.constants.categoryNameCreated;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToCreateCategories;
    return res.status(response.status).send(response);
});

module.exports = router;