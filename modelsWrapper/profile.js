
const Profile = require("../models/profile");
const Search = require("../models/search");
// Should have data.phonenumber to update
module.exports.updateProfile = async function (data) {
    let updatedDoc;
    if (data.business_category || data.last_business_changedAt) {
        // add business changed date
        data.last_business_changedAt = new Date();
    }
    try {
        console.log(data.phonenumber,"099999999s")
        updatedDoc = await Profile.findOneAndUpdate({mobile_no: data.phonenumber},
        {$set:data});
        console.log(updatedDoc,"3");
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.createProfile = async function (phoneNumber) {
    let createdAccount;
    try {
        createdAccount = await Profile.create({
            mobile_no: phoneNumber
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.deleteProfile = async function (phoneNumber) {
    let deletedProfile;
    try {
        deletedProfile = await Profile.deleteOne({
            mobile_no: phoneNumber
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.blockProfile = async function (phoneNumber) {
    let blockedProfile;
    try {
        blockedProfile = await Profile.updateOne({
            mobile_no: phoneNumber
        }, {
            blocked: 1
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.unBlockProfile = async function (phoneNumber) {
    let unBlockedProfile;
    try {
        unBlockedProfile = await Profile.updateOne({
            mobile_no: phoneNumber
        }, {
            blocked: 0
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.unblockProfile = async function (docId) {
    let createdAccount;
    try {
        createdAccount = await Profile.create({
            mobile_no: phoneNumber
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.getAllProfile = async function () {
    let allProfiles;
    try {
        allProfiles = await Profile.find();
    } catch (err) {
        console.log(err);
    }
    return allProfiles;
}

module.exports.getProfileByNumber = async function (phoneNumber) {
    let accountProfile;
    try {
        accountProfile = await Profile.findOne({
            mobile_no: phoneNumber
        });
    } catch (err) {
        console.log(err);
    }
    return accountProfile;
}

module.exports.storeandsearchdata = async function (data) {
    console.log(data,"inputs")
    var storeandsearchdata;
    try {
        let findUserinSearch = await Search.find({usermob_no: data.phonenumber})
        console.log(!findUserinSearch.length,"09090909")
        if(!findUserinSearch.length){
          storeandsearchdata = await Search.create({
            usermob_no: data.phonenumber,
         search_data:data.search_data});
        }else{
            storeandsearchdata = await Search.findOneAndUpdate({usermob_no: data.phonenumber},
                {$push:{search_data:data.search_data}});
        }
      
         
        
            console.log(storeandsearchdata,"2")
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.updatePaidUserInformation = async function (phoneNumber, referralCode) {
    let userProfile;
    try {
        let newPaymentExpiryDate = new Date();
        newPaymentExpiryDate.setFullYear(newPaymentExpiryDate.getFullYear() + 1);
        userProfile = await Profile.updateOne({
            mobile_no: phoneNumber
        }, {
            isPaidUser: 1,
            paymentExpiryDate: newPaymentExpiryDate,
            referralcode: referralCode
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}


module.exports.getSearchData = async function (data) {
    let searchData;
    try {
        searchData = await Search.find({usermob_no:data.phoneNumber},{
            search_data:1,
            _id:0,
           

        });
    } catch (err) {
        console.log(err);
    }
    return searchData;
}