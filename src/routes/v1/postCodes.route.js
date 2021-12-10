const express = require('express');
const router = express.Router();
const validate = require('../../middlewares/validate');
const { postCodesController } = require('../../controllers/');
const { postCodesValidation } = require('../../validations/');

router
  .route('/stores')
  .get(validate(postCodesValidation.getStores), postCodesController.getStores);

router
  .route('/stores/:storeName')
  .get(validate(postCodesValidation.getStore), postCodesController.getStore);

router
  .route('/post-codes/:postCode/radius-search')
  .get(
    validate(postCodesValidation.getRadiusStoresByPostCode),
    postCodesController.getRadiusStoresByPostCode
  );

module.exports = router;
