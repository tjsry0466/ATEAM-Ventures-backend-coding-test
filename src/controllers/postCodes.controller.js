const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { postCodesService } = require('../services');

// 가게 목록 조회
const getStores = catchAsync(async (req, res) => {
  const result = await postCodesService.getStores();
  res.send(result);
});

// postCode로 반경 가게 목록 조회
const getRadiusStoresByPostCode = catchAsync(async (req, res) => {
  const { postCode } = req.params;
  const { limit, radius, widesearch } = req.query;
  const result = await postCodesService.getRadiusStoresByPostCode(
    postCode,
    limit,
    radius,
    widesearch
  );
  res.send(result);
});

// 가게 조회
const getStore = catchAsync(async (req, res) => {
  const { storeName } = req.params;
  const result = await postCodesService.getStoreByName(storeName);
  res.send(result);
});

module.exports = {
  getStores,
  getRadiusStoresByPostCode,
  getStore,
};
