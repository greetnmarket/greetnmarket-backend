// Middle wares alone accepts req,res,next objects in this controller file
var firebaseWrapper = require('../utils/firebase');
var firebaseAuth = require('firebase-admin/auth');
const responseConstants = require('../responses/auth');
var jwtUtils = require('../utils/jwt');
let firebaseSDK;
var profileController = require('../controllers/profile');
var framesController = require('../controllers/frames-mngr');

try {
    firebaseSDK = firebaseWrapper.initializeFirebase();
} catch (err) {
    console.log('error in starting firebase');
    console.log(err);
}

module.exports.verifyFirebaseToken = async function (firebaseToken) {
  console.log(firebaseToken,"9898988")
    try {
        let data = await firebaseAuth.getAuth().verifyIdToken(firebaseToken);

       
        if (!data.uid) {
            return false;
        } 
        // with valid token check for user info generate jwt and provide
        return true;
    } catch (error) {
        console.log(error);
        return false;
    };
};

module.exports.getLocalToken = async function (firebaseToken) {
    try {
        let data = await firebaseAuth.getAuth().verifyIdToken(firebaseToken);
        console.log(data,"89898")
        let informationToSign = {
            'uid': data.uid,
            'phone_number': data.phone_number
        }
        let frameObject = [
          {
            "id": 1,
            "logoSize": "30.0",
            "alignment": "Alignment.topLeft.toString()",
            "isActive": "false",
            "mail": "aaa@gmail.com",
            "website": "www.xxyyzz.com",
            "phNumber": "1234567890",
            "contactLayout": "1"
          },
          {
            "id": 2,
            "logoSize": "30.0",
            "alignment": "Alignment.topCenter.toString()",
            "isActive": "false",
            "mail": "aaa@gmail.com",
            "website": "",
            "phNumber": "1234567890",
            "contactLayout": "1"
          },
          {
            "id": 3,
            "logoSize": "30.0",
            "alignment": "Alignment.topRight.toString()",
            "isActive": "false",
            "mail": "aaa@gmail.com",
            "website": "www.xxyyzz.com",
            "phNumber": "1234567890",
            "contactLayout": "2"
          },
          {
            "id": 4,
            "logoSize": "30.0",
            "alignment": "Alignment.topLeft.toString()",
            "isActive": "false",
            "mail": "aaa@gmail.com",
            "website": "www.xxyyzz.com",
            "phNumber": "1234567890",
            "contactLayout": "2"
          },
          {
            "id": 5,
            "logoSize": "30.0",
            "alignment": "Alignment.topCenter.toString()",
            "isActive": "false",
            "mail": "aaa@gmail.com",
            "website": "",
            "phNumber": "1234567890",
            "contactLayout": "1",
          },
          {
            "id": 6,
            "logoSize": "30.0",
            "alignment": "Alignment.topRight.toString()",
            "isActive": "false",
            "mail": "aaa@gmail.com",
            "website": "",
            "phNumber": "1234567890",
            "contactLayout": "2",
          },
          {
            "id": 7,
            "logoSize": "30.0",
            "alignment": "Alignment.topLeft.toString()",
            "isActive": "false",
            "mail": "aaa@gmail.com",
            "website": "",
            "phNumber": "1234567890",
            "contactLayout": "3"
          },
          {
            "id": 8,
            "logoSize": "30.0",
            "alignment": "Alignment.topRight.toString()",
            "isActive": "false",
            "mail": "aaa@gmail.com",
            "website": "",
            "phNumber": "1234567890",
            "contactLayout": "4"
          },
        ];
        let userProfile = await profileController.getProfileByNumber(data.phone_number)
        // console.log(userProfile,"099009")
        if (userProfile && userProfile.blocked === 1) {
          console.log("print")
          console.log('Blocked user tries to login');
          let response = responseConstants.constants.blockedUser;
          return response;
        }
        // Introducing this here because upon login for first time
        // If account not present create it automatically
        let createProfileIfNotExist = await profileController.createProfile(data.phone_number);
        // If frames not present create it automatically
        let createFrameForUserIfNotExist = await framesController.createFramesByUser(data.phone_number, frameObject);
        let accessToken = await jwtUtils.generateAccessToken(informationToSign);
        let refreshtoken = await jwtUtils.generateRefreshToken(accessToken);
        let validUser = responseConstants.constants.validUser;
        validUser.accessToken = accessToken;
        validUser.refreshtoken = refreshtoken;
        return validUser;
    } catch (error) {
        console.log(error);
        let response = responseConstants.constants.unathorizedUser;
        return response;
    }
};

module.exports.refreshAcessToken = async function (refreshToken) {
    let validToken = await jwtUtils.verfiyRefreshToken(refreshToken);
    if (!validToken) {
        let response = responseConstants.constants.unathorizedUser;
        return response;
    }
    try {
        let decodeRefreshToken = await jwtUtils.decodeToken(refreshToken);
        let decodeOldAccessToken = await jwtUtils.decodeToken(decodeRefreshToken.data.oldToken);
        let informationToSign = {
          'uid': decodeOldAccessToken.data.uid,
          'phone_number': decodeOldAccessToken.data.phone_number
        }
        let accessToken = await jwtUtils.generateAccessToken(informationToSign);
        let validUser = responseConstants.constants.validUser;
        validUser.accessToken = accessToken;
        validUser.refreshtoken = refreshToken;
        return validUser;
    } catch (err) {
        let response = responseConstants.constants.unathorizedUser;
        return response;
    }
}

// This function is shit need to rewrite this in the next iteration
module.exports.adminLogin = async function (username, password) {
  let adminUsersList = {
    "admin" : "admin"
  }
  try {
    if (adminUsersList.hasOwnProperty(username) && adminUsersList[username] === password) {
      let informationToSign = {
        'uid': username,
        'phone_number': password
      }
      let accessToken = await jwtUtils.generateAccessToken(informationToSign);
      let refreshtoken = await jwtUtils.generateRefreshToken(accessToken);
      let validUser = responseConstants.constants.validUser;
      validUser.accessToken = accessToken;
      validUser.refreshtoken = refreshtoken;
      return validUser;
    } else {
      let response = responseConstants.constants.unathorizedUser;
      return response;
    }
  } catch (err) {
    console.log(err);
    let response = responseConstants.constants.unathorizedUser;
    return response;
  }

}

// Use this middle ware to secure endpoints to have only firebase authorised user to work
module.exports.verifyAccessTokenMiddleWare = async function (req, res, next) {
    let validToken = await jwtUtils.verfiyAccessToken(req.headers.accesstoken);
    if (validToken) {
        let decodedToken = await jwtUtils.decodeToken(req.headers.accesstoken);
        console.log(decodedToken);
        req.headers.uid = decodedToken.data.uid;
        req.headers.phone_number = decodedToken.data.phone_number;
        next();
    } else {
        let response = responseConstants.constants.unathorizedUser;
        return res.status(response.status).send(response);
    }
};
