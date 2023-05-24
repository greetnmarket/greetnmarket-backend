var express = require('express');
const { verifyAccessTokenMiddleWare } = require('../controllers/auth');
var router = express.Router();
var framesController = require('../controllers/frames-mngr');
const responseConstants = require('../responses/frames-mngr');

// Get all frames used by all users admin ones
router.get('/all', async function(req, res, next) {
    let response;
    try {
        let frames = await framesController.getAllFrames();
        if (frames) {
            response = responseConstants.constants.allFramesReceived;
            response.data = frames;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetAllFrames;
    return res.status(response.status).send(response);
});

// Get frames used by user
router.get('/',  verifyAccessTokenMiddleWare, async function(req, res, next) {
    let response;
    try {
        let frames = await framesController.getFramesByUser(req.headers.phone_number);
        if (frames) {
            response = responseConstants.constants.allFramesByUser;
            response.data = frames;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetFramesByUser;
    return res.status(response.status).send(response);
});

// Create frames used by user
router.post('/', verifyAccessTokenMiddleWare, async function(req, res, next) {
    let response;
    try {
        let frameObject = req.body.data;
        let frames = await framesController.createFramesByUser(req.headers.phone_number, frameObject);
        if (frames) {
            response = responseConstants.constants.createFrame;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToCreateFrame;
    return res.status(response.status).send(response);
});

// Update frames used by user
router.put('/',  verifyAccessTokenMiddleWare, async function(req, res, next) {
    let response;
    try {
        let frameObject = req.body.data;
        let frames = await framesController.updateFramesByNumber(req.headers.phone_number, frameObject);
        if (frames) {
            response = responseConstants.constants.updateFrame;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToUpdateFrame;
    return res.status(response.status).send(response);
});

// Delete frames used by user
router.delete('/',  verifyAccessTokenMiddleWare, async function(req, res, next) {
    let response;
    try {
        let frames = await framesController.deleteFramesByNumber(req.headers.phone_number);
        if (frames) {
            response = responseConstants.constants.deleteFrame;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToDeleteFrame;
    return res.status(response.status).send(response);
});

module.exports = router;