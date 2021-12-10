const getStores = async () => {
  // TODO 가게 목록 조회 구현
};
const getStoreByName = async (name) => {
  // TODO 이름으로 가게 조회 구현
};
const getLatitudeAndLongitudeByStoreName = async (store) => {
  // TODO 가게 이름으로 위경도 조회 구현
};
const getRadiusStoresByPostCode = async (postCode) => {
  // TODO 우편번호로 반경에있는 가게 목록 조회 구현
};

module.exports = {
  getStores,
  getStoreByName,
  getLatitudeAndLongitudeByStoreName,
  getRadiusStoresByPostCode,
};
