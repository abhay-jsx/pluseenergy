const express = require('express');
const meterController = require('../../controllers/meter.controller');

const router = express.Router();
router
  .route('/get-charge-list')
  .post(meterController.getChargePointList);

router
  .route('/get-charge-point-data/:id/:page/:limit')
  .get(meterController.getChargePointData);

module.exports = router;
