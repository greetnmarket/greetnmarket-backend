var express = require('express');
const { verifyAccessTokenMiddleWare } = require('../controllers/auth');
var router = express.Router();
var profileController = require('../controllers/profile');
var framesController = require('../controllers/frames-mngr');
const responseConstants = require('../responses/profile');
var responseImgConstants = require('../responses/img-mngr');
var imgMngrController = require('../controllers/img-mngr');
const { getProfilePicture, getBusinessPicture } = require('../utils/image-video-processor');
const validator=require('../validator/validator')
// This should be exposed only to admin users so commenting it as of now

router.get('/all', async function(req, res, next) {
    try {
        let profiles = await profileController.getAllProfiles();
        if (profiles) {
            let response = responseConstants.constants.allProfileReceived;
            response.data = profiles;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    let response = responseConstants.constants.unableToGetProfile;
    return res.status(response.status).send(response);
});

router.delete('/', verifyAccessTokenMiddleWare, async function(req, res, next) {
    try {
        let profiles = await profileController.deleteProfile(req.headers.phone_number);
        if (profiles) {
            let frameClearance = await framesController.deleteFramesByNumber(req.headers.phone_number);
            let response = responseConstants.constants.profileDeleted;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    let response = responseConstants.constants.unableToDeleteProfile;
    return res.status(response.status).send(response);
});

router.post('/block', async function(req, res, next) {
    try {
        let profiles = await profileController.blockProfile(req.body.phonenumber);
        if (profiles) {
            let response = responseConstants.constants.profileBlocked;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    let response = responseConstants.constants.unableToBlockProfile;
    return res.status(response.status).send(response);
});

router.post('/unblock', async function(req, res, next) {
    try {
        let profiles = await profileController.unBlockProfile(req.body.phonenumber);
        if (profiles) {
            let response = responseConstants.constants.profileUnblocked;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    let response = responseConstants.constants.unableToUnblockProfile;
    return res.status(response.status).send(response);
});


// For a user to get his profile information
router.post('/', verifyAccessTokenMiddleWare, async function(req, res, next) {
    try {
        let profile = await profileController.getProfileByNumber(req.headers.phone_number);
        if (profile) {
            let response = responseConstants.constants.profileByNumberReceived;
            // These checks and replacement is to replace the original with signed since we are not exposing the original url to public
            if (profile.profile_pic_url) {
                profile.profile_pic_url = await getProfilePicture(req.headers.uid);
            }
            if (profile.business_pic_url) {
                profile.business_pic_url = await getBusinessPicture(req.headers.uid);
            }
            response.data = profile;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    let response = responseConstants.constants.unableToGetProfile;
    return res.status(response.status).send(response);
});

// This is not exposed to user as of now since automatic creation of profile is happening at the first time login so commenting it as of now

router.post('/createprofile',verifyAccessTokenMiddleWare, async function(req, res, next) {
    try {
        let profiles = await profileController.createProfile(req.body.phonenumber);
        if (profiles) {
            let response = responseConstants.constants.profileCreated;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    let response = responseConstants.constants.unableToCreateProfile;
    return res.status(response.status).send(response);
});


router.post('/updateprofile', validator.updateProfileValidator,async function(req, res, next) {
    try {
        // req.body.phonenumber = req.headers.phone_number;
        console.log(req.body,"1")
        let updatedProfile = await profileController.updateProfile(req.body);
        if (updatedProfile) {
            let response = responseConstants.constants.profileUpdated;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    let response = responseConstants.constants.unableToUpdateProfile;
    return res.status(response.status).send(response);
});

// Increase the count of image downloaded by the user
router.put('/imagedownload',verifyAccessTokenMiddleWare, async function(req, res, next) {
    try {
        let phoneNumber = req.headers.phone_number;
        let updatedProfile = await profileController.incrementImgDownloadedCount(phoneNumber);
        if (updatedProfile) {
            let response = responseConstants.constants.imageDownCountIncreased;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    let response = responseConstants.constants.imageDownCountIncreaseFailed;
    return res.status(response.status).send(response);
});

router.put('/searchdata', async function(req, res, next) {
    try {
       
     
        // console.log(storeandsearchdata,"1")
        // if (storeandsearchdata) {
            let response = responseConstants.constants.searchDataaStored;
        //     return res.status(response.status).send(response);
        // }
        let  storeandsearchdata= await profileController.storeandsearchdata(req.body);
        let ctgInfo = await imgMngrController.getImgBySubCategory(req.body.search_data);
        
        if (ctgInfo.length>0) {
            console.log(ctgInfo,"roytete")
            let response = responseImgConstants.constants.imgInformationBySubCategoryReceived;
            response.data = ctgInfo;
            return res.status(response.status).send(response);
        }else{
            let response = responseImgConstants.constants.unableToGetSubCategoryInfo;
            return res.status(response.status).send(response);
        }


        

    } catch (err) {
        console.log(err);
    }
    response.status=500
     return res.status( response.status).send({
        message: 'Internal Server Error'
    });
});


router.get('/getsearchdata', async function(req, res, next) {
    try {
        let searchData = await profileController.getSearchData(req.body);
        console.log(searchData,"090909099")
        if (searchData.length>0) {
            let response = responseConstants.constants.getDataStored;
            response.data = searchData;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    
        let response = responseConstants.constants.unableToGetSearchData;
        return res.status(response.status).send(response);
    
});

module.exports = router;