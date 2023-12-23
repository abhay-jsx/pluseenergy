const express = require('express');
const meterRoute = require('./meter.route');


const router = express.Router();

const defaultRoutes = [
  {
    path: '/api',
    route: meterRoute,
  },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
