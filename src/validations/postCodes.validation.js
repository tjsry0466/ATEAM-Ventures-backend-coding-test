const Joi = require('joi');

const getStores = {
  body: Joi.object().keys({}),
};

const getRadiusStoresByPostCode = {
  params: Joi.object().keys({
    postCode: Joi.string()
      .regex(/^([A-Z][A-HJ-Y]?\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/)
      .required(),
  }),
  query: Joi.object().keys({
    limit: Joi.number().min(1).max(100),
    radius: Joi.number().min(1).max(2000),
    widesearch: Joi.boolean(),
  }),
};

const getStore = {
  params: Joi.object().keys({
    storeName: Joi.string().required(),
  }),
};

module.exports = {
  getStores,
  getRadiusStoresByPostCode,
  getStore,
};
