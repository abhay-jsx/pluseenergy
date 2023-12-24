const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { meterService } = require('../services');

const getChargePointList = catchAsync(async (req, res) => {
  const jsonArray = await meterService.getChargePointList(req.body);
  if (!jsonArray) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Meter Reading Found');
  }
  res.send(jsonArray);
});

const getChargePointData = catchAsync(async (req, res) => {
  const jsonArray = await meterService.getChargePointData(req.params);
  if (!jsonArray) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Meter Reading Found');
  }
  res.send(jsonArray);
});


module.exports = {
  getChargePointList,
  getChargePointData
};
