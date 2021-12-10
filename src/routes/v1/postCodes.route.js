const express = require('express');
const router = express.Router();
const { postCodesController } = require('../../controllers/');

router.route('/stores').get(postCodesController.getStores);
router.route('/stores/:storeName').get(postCodesController.getStore);

router
  .route('/post-codes/:postCode/radius-search')
  .get(postCodesController.getRadiusStoresByPostCode);

module.exports = router;
