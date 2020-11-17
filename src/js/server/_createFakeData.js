/* 상품 옵션을 받아서 랜덤 데이터 생성 */
// TODO: 특정 버튼을 눌렀을때만 새로운 데이터를 생성하도록 변경하기 (현재는 새로고침 할때마다 데이터가 변경되어버림)
const productsOptions = require("./_productsOptions.js");

const NUMBER_OF_PRODUCTS = 100;

const createFakeData = (options) => {
  let fakeData = {};

  fakeData = toArray(options).map((elem) => {
    let key = elem[0];
    let randomElem = getRandomElem(elem[1]);
    return [key, randomElem];
  });

  return toObject(fakeData);

  function toArray(obj) {
    return Object.entries(obj);
  }

  function toObject(arr) {
    return Object.fromEntries(arr);
  }

  function getRandomElem(arr) {
    let randomIndex = getRandomNum(arr.length);
    return arr[randomIndex];
  }

  function getRandomNum(arrLength) {
    return parseInt(Math.random() * arrLength);
  }
};

const fakeProductsData = [];

for (let i = 0; i < NUMBER_OF_PRODUCTS; i++) fakeProductsData.push(createFakeData(productsOptions));

module.exports = fakeProductsData;
