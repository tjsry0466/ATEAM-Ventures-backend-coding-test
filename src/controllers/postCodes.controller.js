const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

// 가게 목록 조회
const getStores = catchAsync((req, res) => {
  // TODO 가게 목록 조회 작성
});

const getRadiusStoresByPostCode = catchAsync((req, res) => {
  // TODO 가게 조회 작성
});

// 가게 조회
const getStore = catchAsync((req, res) => {
  // TODO 가게 조회 작성
});

module.exports = {
  getStores,
  getRadiusStoresByPostCode,
  getStore,
};
