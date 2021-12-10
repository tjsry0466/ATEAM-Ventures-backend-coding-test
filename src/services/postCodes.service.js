const axios = require('axios');
const { stores } = require('../models');
const { postCodeAPIConfig } = require('../config/');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { axiosHttpRequest } = require('../utils/axiosHttpRequest');

const getStores = () => {
  return stores;
};
const getStoreByName = (name) => {
  // stores 데이터중 인자로 받은 name를 포함하는 데이터만 반환
  return stores.filter((item) => item.name.includes(name));
};

const isValidPostCode = (postCode) => {
  // stores 데이터중 인자로 받은 postCode와 일치하는 데이터가 1개 이상 존재하는지 확인
  return !!stores.filter((item) => item.postcode === postCode).length;
};

const getLatitudeAndLongitudeByPostCode = async (postCode) => {
  // 존재하지 않는 포스트코드 에러 반환
  if (!isValidPostCode(postCode)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'stores에 존재하지 않는 postcode입니다. 정확한 postcode를 입력해주시기 바랍니다.'
    );
  }

  const requestUrl = postCodeAPIConfig.URL + postCode;
  const response = await axiosHttpRequest(requestUrl);
  // 응답을 못받아왔거나, 응답의 status code가 200이 아닌 경우 에러 반환
  const { latitude, longitude } = response.result;
  return { latitude, longitude };
};
const getRadiusStoresByPostCode = async (
  postCode,
  limit = 10,
  radius = 10,
  widesearch = false
) => {
  const { latitude, longitude } = await getLatitudeAndLongitudeByPostCode(
    postCode
  );

  // postCodes 우편번호 반경 API 요청
  // limit - default 10, under 100
  // radius - default 10m, under 2000m
  // widesearch - dafault false, true => 20km까지 검색가능. limit 10.
  let response = await axiosHttpRequest(
    postCodeAPIConfig.URL,
    {
      geolocations: [{ latitude, longitude, radius, limit, widesearch }],
    },
    'POST'
  );

  // stores.json에서 검색하기 위한 postcode와 정렬을 위한 latitude 배열 추출하여 생성
  response = response.result[0].result.map((el) => {
    return {
      postcode: el.postcode,
      latitude: el.latitude,
    };
  });

  // 북->남 내림차순으로 정렬
  response.sort((prev, next) => next.latitude - prev.latitude);
  // postcode 배열 추출하여 생성
  response = response.map((item) => item.postcode);
  // stores에서 API 결과의 post code와 같은 것만 가져옴
  const result = stores.filter((store) => response.includes(store.postcode));

  return result;
};

module.exports = {
  getStores,
  getStoreByName,
  getLatitudeAndLongitudeByPostCode,
  getRadiusStoresByPostCode,
};
