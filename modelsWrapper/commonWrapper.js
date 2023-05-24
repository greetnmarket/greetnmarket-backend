const mainBanner = require('../models/mainBanner');
const offerBanner = require('../models/offerBanner');
const subCtgTextBanner = require('../models/subCtgTextBanner');
const subCategories = require('../models/subcategories');
const cmnSubCtg = require('../models/commonSubCategories');
const upcomingFestivalBanner = require('../models/upcomingFestivalBanner');

module.exports.updateOrderNumber = async function(changeObject) {
    let updateOrderInfo;
    try {
        switch (changeObject.type) {
            case 'mainbanner': {
                updateOrderInfo = await mainBanner.findByIdAndUpdate(changeObject.id, {
                    orderNo: changeObject.orderNo
                });
                return true;
            }
            case 'offerbanner': {
                updateOrderInfo = await offerBanner.findByIdAndUpdate(changeObject.id, {
                    orderNo: changeObject.orderNo
                });
                return true;
            }
            case 'textbanner': {
                updateOrderInfo = await subCtgTextBanner.findByIdAndUpdate(changeObject.id, {
                    orderNo: changeObject.orderNo
                });
                return true;
            }
            case 'subcategory': {
                updateOrderInfo = await subCategories.findByIdAndUpdate(changeObject.id, {
                    orderNo: changeObject.orderNo
                });
                return true;
            }
            case 'commonsubcategory': {
                updateOrderInfo = await cmnSubCtg.findByIdAndUpdate(changeObject.id, {
                    orderNo: changeObject.orderNo
                });
                return true;
            }
            case 'upcomingfestivalbanner': {
                updateOrderInfo = await upcomingFestivalBanner.findByIdAndUpdate(changeObject.id, {
                    orderNo: changeObject.orderNo
                });
                return true;
            }
        }
    } catch (err) {
        console.log(err);
    }
    return false;
};