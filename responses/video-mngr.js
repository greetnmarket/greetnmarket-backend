module.exports.constants = {
    'commonvideocreated': {
        'status': '200',
        'message': 'Common video created Successfully',
        'location': 'UPDATE THE LOCATION OF THE OBJECT',
        'key': 'SEND KEY OF THE S3 OBJECT'
    },
    'commonvideocreationfailed': {
        'status': '400',
        'message': 'Common video creation failed'
    },
    'subCtgVideoMapCreated': {
        'status': '200',
        'message': 'Sub category mapped to video successfully'
    },
    'subCtgVideoMapFailed': {
        'status': '400',
        'message': 'Sub category video map creation failed'
    },
    'langVideoMapCreated': {
        'status': '200',
        'message': 'Language mapped to video successfully'
    },
    'langVideoMapFailed': {
        'status': '400',
        'message': 'Language video map creation failed'
    },
    'subCtgVideoMapUnlinked': {
        'status': '200',
        'message': 'Sub category unlinked from video successfully'
    },
    'subCtgVideoUnlinkFailed': {
        'status': '400',
        'message': 'Sub category video map unlinking failed'
    },
    'langVideoMapUnlinked': {
        'status': '200',
        'message': 'Language unlinked from video successfully'
    },
    'langVideoUnlinkFailed': {
        'status': '400',
        'message': 'Language image video unlinking failed'
    },
    'videoInformationReceived': {
        'status': '200',
        'message': 'Video information listed',
        'data': 'SEND AN OBJECT OF THE VIDEO'
    },
    'unableToGetVideoInfo': {
        'status': '400',
        'message': 'Unable to get video information'
    },
    'videoInformationBySubCategoryReceived': {
        'status': '200',
        'message': 'Video information listed for the sub category',
        'data': 'SEND AN OBJECT OF THE VIDEOS'
    },
    'unableToGetSubCategoryInfo': {
        'status': '400',
        'message': 'Unable to get sub category videos'
    },
    'videoInformationBySubCategoryAndLangReceived': {
        'status': '200',
        'message': 'Video information listed for the sub category and language',
        'data': 'SEND AN OBJECT OF THE VIDEO'
    },
    'unableToGetSubCategoryAndLangInfo': {
        'status': '400',
        'message': 'Unable to get videos by sub category and lang'
    }
};