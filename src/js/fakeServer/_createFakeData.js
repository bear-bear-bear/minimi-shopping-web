/* 상품 옵션을 받아서 랜덤 데이터 생성 */
// TODO: 특정 버튼을 눌렀을때만 새로운 데이터를 생성하도록 변경하기 (현재는 새로고침 할때마다 데이터가 변경되어버림)
import productsOptions from './_productsOptions.js';

const NUMBER_OF_PRODUCTS = 100; // 제품 데이터는 100개로 설정

const createFakeData = (options) => {
  const fakeData = toArray(options).map((elem) => {
    const key = elem[0];
    const randomElem = getRandomElem(elem[1]);
    return [key, randomElem];
  });

  return toObject(fakeData);

  function toArray(obj) {
    return Object.entries(obj); // object -> array
  }

  function toObject(array) {
    return Object.fromEntries(array); // array -> object
  }

  function getRandomElem(array) {
    const randomIndex = getRandomNum(array.length);
    return array[randomIndex]; // 배열에서 랜덤으로 요소 반환
  }

  function getRandomNum(num) {
    return parseInt(Math.random() * num); // 0 ~ num-1 의 정수 숫자 한개 반환
  }
};

const DB = [];

for (let i = 0; i < NUMBER_OF_PRODUCTS; i++) {
  const data = createFakeData(productsOptions);

  DB.push(data);
}

const returnData = (color = null) => {
  if (!Boolean(color)) {
    return DB;
  } else {
    return DB.filter((data) => data.color === color);
  }
};

export { DB, returnData };
