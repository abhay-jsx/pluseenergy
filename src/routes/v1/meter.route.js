const express = require('express');
const meterController = require('../../controllers/meter.controller');

const router = express.Router();
router
  .route('/get-charge-list')
  .post(meterController.getChargePointList);

router
  .route('/get-charge-point-data')
  .post(meterController.getChargePointData);

module.exports = router;
