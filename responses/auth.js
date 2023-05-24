module.exports.constants = {
    'unathorizedUser': {
        'status': '401',
        'message': 'Unauthorized'
    },
    'validUser': {
        'status': '200',
        'accessToken': 'GENERATE TOKEN',
        'refreshtoken': 'GENERATE TOKEN',
        'message': 'login successfull'
    },
    'blockedUser': {
        'status': '403',
        'message': 'Your account is blocked from usage'
    }
}