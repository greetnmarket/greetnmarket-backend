var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');
const responseConstants = require('../responses/auth');

router.post('/login', async function(req, res, next) {
  try {
    let fireBaseResponse = await authController.verifyFirebaseToken(req.body.token);
    // console.log(fireBaseResponse,"9898989889")
    if (!fireBaseResponse) {
      let response = responseConstants.constants.unathorizedUser;
      return res.status(response.status).send(response);
    }
    let loginResponse = await authController.getLocalToken(req.body.token);
    // console.log(loginResponse,"88888")
    // console.log(loginResponse);
    return res.status(loginResponse.status).send(loginResponse);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Internal Server Error'
    });
  }
});

router.post('/refresh', async function(req, res, next) {
  try {
    let responseValue = await authController.refreshAcessToken(req.headers.refreshtoken);
    return res.status(responseValue.status).send(responseValue);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Internal Server Error'
    });
  }
});

router.post('/admin/login', async function(req, res, next) {
  try {
    let loginResponse = await authController.adminLogin(req.body.username, req.body.password);
    console.log(loginResponse);
    return res.status(loginResponse.status).send(loginResponse);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Internal Server Error'
    });
  }
});


module.exports = router;
