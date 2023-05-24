var userReportHandler = require('../modelsWrapper/helpsupport');

module.exports.getReportByType = async function (type) {
    let reportInfo;
    try {
        reportInfo = await userReportHandler.getReportByType(type);
    } catch (err) {
        console.log(err);
    }
    return reportInfo;
}

module.exports.getReportByUser = async function (phoneNumber) {
    let reportInfo;
    try {
        reportInfo = await userReportHandler.getReportByUser(phoneNumber);
    } catch (err) {
        console.log(err);
    }
    return reportInfo;
}

module.exports.getReportByUserAndType = async function (phoneNumber, type) {
    let reportInfo;
    try {
        reportInfo = await userReportHandler.getReportByUserAndType(phoneNumber, type);
    } catch (err) {
        console.log(err);
    }
    return reportInfo;
}

module.exports.getAllReport = async function () {
    let reportInfo;
    try {
        reportInfo = await userReportHandler.getAllReportInfo();
    } catch (err) {
        console.log(err);
    }
    return reportInfo;
}

module.exports.createUserReport = async function (phoneNumber, reportObject) {
    let reportInfo;
    try {
        reportInfo = await userReportHandler.createReport(phoneNumber, reportObject);
        if (reportInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.deleteReportById = async function (id) {
    let reportInfo;
    try {
        reportInfo = await userReportHandler.deleteReportById(id);
        if (reportInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.updateResolveStatusById = async function (id, status) {
    let reportInfo;
    try {
        reportInfo = await userReportHandler.updateResolveStatusById(id, status);
        if (reportInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}
