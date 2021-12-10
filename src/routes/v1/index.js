const express = require('express');
const postCodes = require('./postCodes.route');
const { swaggerUi, specs } = require('../../config/swagger');
const swaggerDocument = require('./swagger.json');

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
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
