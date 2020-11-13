import { productsOptions } from "./productsOptions.js";

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

const products = [];

for (let i = 0; i < NUMBER_OF_PRODUCTS; i++) products.push(createFakeData(productsOptions));

export const fakeProductsData = products; // fakeData test
