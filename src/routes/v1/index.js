const express = require('express');
const postCodes = require('./postCodes.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: postCodes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
