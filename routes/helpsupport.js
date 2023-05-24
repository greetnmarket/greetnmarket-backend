var express = require('express');
const { verifyAccessTokenMiddleWare } = require('../controllers/auth');
var router = express.Router();
var userReportController = require('../controllers/helpsupport');
const responseConstants = require('../responses/helpsupport');

// Get all bug and feedback used by all users admin ones
router.get('/all', async function(req, res, next) {
    let response;
    try {
        let reportInfo = await userReportController.getAllReport();
        if (reportInfo) {
            response = responseConstants.constants.allReportReceived;
            response.data = reportInfo;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetAllReports;
    return res.status(response.status).send(response);
});

// Create bug or feedback by user
router.post('/', verifyAccessTokenMiddleWare, async function(req, res, next) {
    let response;
    try {
        let reportObject = req.body.data;
        let report = await userReportController.createUserReport(req.headers.phone_number, reportObject);
        if (report) {
            response = responseConstants.constants.createReport;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToCreateReport;
    return res.status(response.status).send(response);
});

// Delete bug or feedback made by user
router.delete('/:id', async function(req, res, next) {
    let response;
    try {
        let report = await userReportController.deleteReportById(req.params.id);
        if (report) {
            response = responseConstants.constants.deleteReport;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToDeleteReport;
    return res.status(response.status).send(response);
});

// update a report status
router.put('/status/:id/:status', async function(req, res, next) {
    let response;
    try {
        let report = await userReportController.updateResolveStatusById(req.params.id, req.params.status);
        if (report) {
            response = responseConstants.constants.updateReport;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToUpdateReport;
    return res.status(response.status).send(response);
});

// get user specific reporting info
router.get('/myreports', verifyAccessTokenMiddleWare, async function(req, res, next) {
    let response;
    try {
        let reportInfo = await userReportController.getReportByUser(req.headers.phone_number);
        if (reportInfo) {
            response = responseConstants.constants.allReportReceivedByUser;
            response.data = reportInfo;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetReportByUser;
    return res.status(response.status).send(response);
});

// Get bug and feedback by type
router.get('/myreports/:type', verifyAccessTokenMiddleWare, async function(req, res, next) {
    let response;
    try {
        let reportInfo = await userReportController.getReportByUserAndType(req.headers.phone_number, req.params.type);
        if (reportInfo) {
            response = responseConstants.constants.allReportReceivedByUserAndType;
            response.data = reportInfo;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetReportByUserAndType;
    return res.status(response.status).send(response);
});

// Get bug and feedback by type
router.get('/:type', async function(req, res, next) {
    let response;
    try {
        let reportInfo = await userReportController.getReportByType(req.params.type);
        if (reportInfo) {
            response = responseConstants.constants.allReportReceivedByType;
            response.data = reportInfo;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    response = responseConstants.constants.unableToGetReportByType;
    return res.status(response.status).send(response);
});

module.exports = router;