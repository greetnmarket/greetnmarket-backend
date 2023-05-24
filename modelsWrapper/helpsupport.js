const reportInfo = require("../models/helpsupport");

module.exports.getAllReportInfo = async function () {
    let allData;
    try {
        allData = await reportInfo.find();
    } catch (err) {
        console.log(err);
    }
    return allData;
}

module.exports.getReportByType = async function (reportType) {
    let reportData;
    try {
        reportData = await reportInfo.find({
            type: reportType
        });
    } catch (err) {
        console.log(err);
    }
    return reportData;
}

module.exports.getReportByUser = async function (phoneNumber) {
    let reportData;
    try {
        reportData = await reportInfo.find({
            user: phoneNumber
        });
    } catch (err) {
        console.log(err);
    }
    return reportData;
}

module.exports.getReportByUserAndType = async function (phoneNumber, type) {
    let reportData;
    try {
        reportData = await reportInfo.find({
            user: phoneNumber,
            'type': type
        });
    } catch (err) {
        console.log(err);
    }
    return reportData;
}

module.exports.deleteReportById = async function (id) {
    let deleteReport;
    try {
        deleteReport = await reportInfo.findByIdAndDelete(id);
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.updateResolveStatusById = async function (id, status) {
    let updateReport;
    try {
        updateReport = await reportInfo.findByIdAndUpdate(id, {
            resolved: status
        });
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.createReport = async function (phoneNumber, reportObject) {
    let report;
    try {
        report = await reportInfo.create({
            user: phoneNumber,
            type: reportObject.type,
            title: reportObject.title,
            description: reportObject.description
        });
        return true
    } catch (err) {
        console.log(err);
    }
    return false;
}