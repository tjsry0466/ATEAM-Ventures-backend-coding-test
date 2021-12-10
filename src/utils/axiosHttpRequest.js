const axios = require('axios');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const axiosHttpRequest = async (url, params, method = 'GET') => {
  let response;
  try {
    if (method === 'GET') {
      response = params ? await axios.get(url, params) : await axios.get(url);
    } else if (method === 'POST') {
      response = params ? await axios.post(url, params) : await axios.post(url);
    } else {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        '서버 에러 - API 요청 메소드 에러입니다.'
      );
    }
  } catch (e) {
    throw new ApiError(
      httpStatus.SERVICE_UNAVAILABLE,
      '외부 API 에러 - 요청에 실패했습니다.'
    );
  }
  if (response.data.status !== httpStatus.OK) {
    throw new ApiError(
      httpStatus.SERVICE_UNAVAILABLE,
      '외부 API 에러 - 요청에 대한 응답이 올바르지 않습니다.'
    );
  }
  return response.data;
};

module.exports = {
  axiosHttpRequest,
};
