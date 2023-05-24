require('dotenv').config();
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const s3 = new S3Client({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

module.exports.uploadProfilePicture = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.PROFILE_PICTURE_ACCESS_POINT,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, req.headers.uid || 'unknown_item');
    }
  })
});

module.exports.getProfilePicture = async function (profileObjectkey) {
  let signedUrl = '';
  try {
    let getObjectParams = {
      Bucket: process.env.PROFILE_PICTURE_ACCESS_POINT,
      Key: profileObjectkey
    }
    const command = new GetObjectCommand(getObjectParams);
    signedUrl = await getSignedUrl(s3, command, { expiresIn: process.env.SIGNED_URL_EXPIRATION_TIME });
  } catch (err) {
    console.log(err);
  }
  return signedUrl;
}

module.exports.uploadBusinessPicture = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUSINESS_PICTURE_ACCESS_POINT,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, req.headers.uid || 'unknown_item');
    }
  })
});

module.exports.getBusinessPicture = async function (businessObjectkey) {
  let signedUrl = '';
  try {
    let getObjectParams = {
      Bucket: process.env.BUSINESS_PICTURE_ACCESS_POINT,
      Key: businessObjectkey
    }
    const command = new GetObjectCommand(getObjectParams);
    signedUrl = await getSignedUrl(s3, command, { expiresIn: process.env.SIGNED_URL_EXPIRATION_TIME });
  } catch (err) {
    console.log(err);
  }
  return signedUrl;
}

module.exports.uploadCommonPicture = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.COMMON_PICTURE_ACCESS_POINT,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString()+ '_' + file.originalname || 'unknown_item');
    }
  })
});

module.exports.getCommonPicture = async function (commonObjectkey) {
  let signedUrl = '';
  try {
    let getObjectParams = {
      Bucket: process.env.COMMON_PICTURE_ACCESS_POINT,
      Key: commonObjectkey
    }
    const command = new GetObjectCommand(getObjectParams);
    signedUrl = await getSignedUrl(s3, command, { expiresIn: process.env.SIGNED_URL_EXPIRATION_TIME });
  } catch (err) {
    console.log(err);
  }
  return signedUrl;
}

module.exports.uploadCommonVideo = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.COMMON_VIDEO_ACCESS_POINT,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString()+ '_' + file.originalname || 'unknown_item');
    }
  })
});

module.exports.getCommonVideo = async function (commonObjectkey) {
  let signedUrl = '';
  try {
    let getObjectParams = {
      Bucket: process.env.COMMON_VIDEO_ACCESS_POINT,
      Key: commonObjectkey
    }
    const command = new GetObjectCommand(getObjectParams);
    signedUrl = await getSignedUrl(s3, command, { expiresIn: process.env.SIGNED_URL_EXPIRATION_TIME });
  } catch (err) {
    console.log(err);
  }
  return signedUrl;
}

module.exports.uploadUserSpecificPicture = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.USER_SPECIFIC_PICTURE_ACCESS_POINT,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString()+ '_' + file.originalname || 'unknown_item');
    }
  })
});

module.exports.getUserSpecificPicture = async function (userSpecificObjectkey) {
  let signedUrl = '';
  try {
    let getObjectParams = {
      Bucket: process.env.USER_SPECIFIC_PICTURE_ACCESS_POINT,
      Key: userSpecificObjectkey
    }
    const command = new GetObjectCommand(getObjectParams);
    signedUrl = await getSignedUrl(s3, command, { expiresIn: process.env.SIGNED_URL_EXPIRATION_TIME });
  } catch (err) {
    console.log(err);
  }
  return signedUrl;
}

module.exports.uploadBannerPicture = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BANNER_PICTURE_ACCESS_POINT,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString()+ '_' + file.originalname || 'unknown_item');
    }
  })
});

module.exports.getBannerPicture = async function (bannerImgObjectkey) {
  let signedUrl = '';
  try {
    let getObjectParams = {
      Bucket: process.env.BANNER_PICTURE_ACCESS_POINT,
      Key: bannerImgObjectkey
    }
    const command = new GetObjectCommand(getObjectParams);
    signedUrl = await getSignedUrl(s3, command, { expiresIn: process.env.SIGNED_URL_EXPIRATION_TIME });
  } catch (err) {
    console.log(err);
  }
  return signedUrl;
}