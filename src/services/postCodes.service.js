const httpStatus = require('http-status');
const { stores } = require('../models');
const { postCodeAPIConfig } = require('../config/');
const ApiError = require('../utils/ApiError');
const { axiosHttpRequest } = require('../utils/axiosHttpRequest');

/**
 * @description stores.json 파일에 저장된 가게 목록을 반환합니다.
 * @returns {{name: String, postcode: String}[]} stores
 */
const getStores = () => {
  return stores;
};

/**
 * @description stores.json 파일에 저장된 가게 목록중 name을 포함하는 결과를 반환합니다.
 * @param { String } name
 * @returns {{name: String, postcode: String}[]} stores
 */
const getStoreByName = (name) => {
  // stores 데이터중 인자로 받은 name를 포함하는 데이터만 반환
  return stores.filter((item) => item.name.includes(name));
};

/**
 * @description 입력받은 postCode가 stores.json에 저장되어 있는 정보인지 확인합니다.
 * @param { String } postCode
 * @returns {Boolean}
 */
const isValidPostCode = (postCode) => {
  // stores 데이터중 인자로 받은 postCode와 일치하는 데이터가 1개 이상 존재하는지 확인
  return !!stores.filter((item) => item.postcode === postCode).length;
};

/**
 * @description postcode API 를 통해 postCode의 위/경도를 조회합니다.
 * @param { String } postCode
 * @returns {{ latitude: String, longitude: String }}
 */
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

/**
 * @description postcode API 를 통해 postCode의 위/경도 반경에 있는 가게들을 위도의 내림차순으로 반환합니다.
 * @param { postCode } postCode
 * @param { Number } limit - 반환될 가게의 최대 갯수 입니다. 기본값 10. 최대값 100
 * @param { Number } radius - 검색할 반경 크기 입니다. 기본값 10. 최댓값 2000
 * @param { Boolean } widesearch - true로 설정하면 20km 근방의 최대 20개의 가게 목록을 조회합니다.
 * @returns {{ latitude: String, longitude: String }}
 */
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
      longitude: el.longitude,
    };
  });

  // 북->남 내림차순으로 정렬
  response.sort((prev, next) => next.latitude - prev.latitude);
  return response;
};

module.exports = {
  getStores,
  getStoreByName,
  getLatitudeAndLongitudeByPostCode,
  getRadiusStoresByPostCode,
};
