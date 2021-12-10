const express = require('express');
const validate = require('../../middlewares/validate');
const { postCodesController } = require('../../controllers/');
const { postCodesValidation } = require('../../validations/');
const router = express.Router();

router
  .route('/stores')
  .get(validate(postCodesValidation.getStores), postCodesController.getStores);

router
  .route('/stores/:storeName')
  .get(validate(postCodesValidation.getStore), postCodesController.getStore);

router
  .route('/stores/post-codes/:postCode/radius-search')
  .get(
    validate(postCodesValidation.getRadiusStoresByPostCode),
    postCodesController.getRadiusStoresByPostCode
  );

module.exports = router;
