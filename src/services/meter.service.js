const MeterData = require('../models/meter.model');


const getChargePointData = async (reqBody) => {
    try {
        const data = await MeterData.getChargePointData(reqBody?.id,reqBody?.page,reqBody?.limit);
        return data;
    } catch (error) {
        console.log(error);
    }
};
const getChargePointList = async (reqBody) => {
    try {
        const data = await MeterData.getChargePointList(reqBody?.ids,reqBody?.page,reqBody?.limit);
        return data;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getChargePointData,
    getChargePointList
};