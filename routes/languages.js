var express = require('express');
var router = express.Router();
var languagesController = require('../controllers/languages');
const responseConstants = require('../responses/languages');

// Get all languages used by all users
router.get('/', async function(req, res, next) {
    let response;
    try {
        let languages = await languagesController.getAllLanguages();
        if (languages) {
            response = responseConstants.constants.allLanguagesReceived;
            response.data = languages;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetLanguages;
    return res.status(response.status).send(response);
});

// Deleting a language admin panel usage so commenting it out as of now

router.delete('/:name', async function(req, res, next) {
    let response;
    try {
        let name = req.params.name;
        let langName = await languagesController.deleteLanguage(name);
        if (langName) {
            response = responseConstants.constants.languageNameDeleted;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToDeleteLanguage;
    return res.status(response.status).send(response);
});


// Creating a language admin panel usage so commenting it out as of now

router.post('/', async function(req, res, next) {
    let response;
    try {
        let name = req.body.name;
        let langName = await languagesController.createLanguage(name);
        if (langName) {
            response = responseConstants.constants.languageCreated;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToCreateLanguage;
    return res.status(response.status).send(response);
});

module.exports = router;