var commonController = require('../modelsWrapper/commonWrapper');

module.exports.updateOrderNumber = async function (changeObject) {
    let orderUpdate;
    try {
        orderUpdate = await commonController.updateOrderNumber(changeObject);
        if (orderUpdate) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}