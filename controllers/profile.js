var profileHandler = require('../modelsWrapper/profile');

module.exports.getAllProfiles = async function () {
    let profilesInfo;
    try {
        profilesInfo = await profileHandler.getAllProfile();
    } catch (err) {
        console.log(err);
    }
    return profilesInfo;
}

module.exports.createProfile = async function (phoneNumber) {
    let profilesInfo;
    try {
        profilesInfo = await profileHandler.createProfile(phoneNumber);
    } catch (err) {
        console.log(err);
    }
    if (profilesInfo) {
        return true;
    }
    return false;
}

module.exports.updateProfile = async function (data) {
    let updatedProfile;
    try {
        updatedProfile = await profileHandler.updateProfile(data);
        console.log(updatedProfile,"2")
        if (updatedProfile) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.deleteProfile = async function (phone_number) {
    let deletedProfile;
    try {
        deletedProfile = await profileHandler.deleteProfile(phone_number);
        if (deletedProfile) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.blockProfile = async function (phone_number) {
    let blockedProfile;
    try {
        blockedProfile = await profileHandler.blockProfile(phone_number);
        if (blockedProfile) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.unBlockProfile = async function (phone_number) {
    let unBlockedProfile;
    try {
        unBlockedProfile = await profileHandler.unBlockProfile(phone_number);
        if (unBlockedProfile) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.getProfileByNumber = async function (phonenumber) {
    let profileInfo;
    try {
        profileInfo = await profileHandler.getProfileByNumber(phonenumber);
    } catch (err) {
        console.log(err);
    }
    return profileInfo;
}

// Increase the picture downloaded count by the user
module.exports.incrementImgDownloadedCount = async function (phone_number) {
    let increaseImgDownloadedCount;
    try {
        increaseImgDownloadedCount = await profileHandler.incrementImgDownloadedCount(phone_number);
        if (increaseImgDownloadedCount) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}


module.exports.storeandsearchdata = async function (data) {
    let storeandsearchdata;
    try {
        storeandsearchdata = await profileHandler.storeandsearchdata(data);
        if (storeandsearchdata) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.getSearchData = async function (data) {
    let searchData;
    try {
        searchData = await profileHandler.getSearchData(data);
    } catch (err) {
        console.log(err);
    }
    return searchData;
}