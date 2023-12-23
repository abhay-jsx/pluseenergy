const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const MeterData = require('../models/meter.model');

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<MeterData>}
 */

const getChargePointData = async (id) => {
    try {
        const data = await MeterData.getChargePointData(id);
        return data;
    } catch (error) {
        console.log(error);
    }
};const getChargePointList = async (reqBody) => {
    try {
        console.log(reqBody.ids)
        const data = await MeterData.getChargePointList(reqBody.ids,reqBody.page,reqBody.limit);
        return data;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getChargePointData,
    getChargePointList
};