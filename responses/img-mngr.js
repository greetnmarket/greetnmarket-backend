module.exports.constants = {
    'profilepicupdated': {
        'status': '200',
        'message': 'Profile Picture updated Successfully',
        'location': 'UPDATE THE LOCATION OF THE OBJECT'
    },
    'profilepicupdatefailed': {
        'status': '400',
        'message': 'Profile picture updation failed'
    },
    'businesspicupdated': {
        'status': '200',
        'message': 'Business Picture updated Successfully',
        'location': 'UPDATE THE LOCATION OF THE OBJECT'
    },
    'businesspicupdatefailed': {
        'status': '400',
        'message': 'Profile picture updation failed'
    },
    'commonpiccreated': {
        'status': '200',
        'message': 'Common Picture created Successfully',
        'location': 'UPDATE THE LOCATION OF THE OBJECT',
        'key': 'SEND KEY OF THE S3 OBJECT'
    },
    'commonpiccreationfailed': {
        'status': '400',
        'message': 'Common picture creation failed'
    },
    'userSpecificPiccreated': {
        'status': '200',
        'message': 'User Specific Picture creted Successfully',
        'location': 'UPDATE THE LOCATION OF THE OBJECT'
    },
    'userSpecificPicCreationfailed': {
        'status': '400',
        'message': 'User specific picture creation failed'
    },
    'subCtgImgMapCreated': {
        'status': '200',
        'message': 'Sub category mapped to image successfully'
    },
    'subCtgImgMapFailed': {
        'status': '400',
        'message': 'Sub category image map creation failed'
    },
    'subCtgImgMapUnlinked': {
        'status': '200',
        'message': 'Sub category unlinked from image successfully'
    },
    'subCtgImgUnlinkFailed': {
        'status': '400',
        'message': 'Sub category image map unlinking failed'
    },
    'langImgMapUnlinked': {
        'status': '200',
        'message': 'Language unlinked from image successfully'
    },
    'langImgUnlinkFailed': {
        'status': '400',
        'message': 'Language image map unlinking failed'
    },
    'unableToGetImgInfo': {
        'status': '400',
        'message': 'Unable to get image information'
    },
    'imgInformationReceived': {
        'status': '200',
        'message': 'Image information listed',
        'data': 'SEND AN OBJECT OF THE IMAGES'
    },
    'unableToGetSubCategoryInfo': {
        'status': '400',
        'message': 'Unable to get sub category images'
    },
    'imgInformationBySubCategoryReceived': {
        'status': '200',
        'message': 'Image information listed for the sub category',
        'data': 'SEND AN OBJECT OF THE IMAGES'
    },
    'langImgMapCreated': {
        'status': '200',
        'message': 'Language mapped to image successfully'
    },
    'langImgMapFailed': {
        'status': '400',
        'message': 'Language image map creation failed'
    },
    'unableToGetSubCategoryAndLangInfo': {
        'status': '400',
        'message': 'Unable to get images by sub category and lang'
    },
    'imgInformationBySubCategoryAndLangReceived': {
        'status': '200',
        'message': 'Image information listed for the sub category and language',
        'data': 'SEND AN OBJECT OF THE Images'
    }
}