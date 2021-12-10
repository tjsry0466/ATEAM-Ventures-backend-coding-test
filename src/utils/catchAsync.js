// 에러 발생시 해당 에러를 next()를 통해 다음 단계로 넘기기 위해 사용
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;
