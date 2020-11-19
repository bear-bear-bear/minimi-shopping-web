(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const getData = require("./pagenation/paginate.js");

window.onload = () => {
  getData();
};

},{"./pagenation/paginate.js":3}],2:[function(require,module,exports){
// index.html 파일 기준 이미지 디렉터리 경로
const IMG_DIR_PATH = "./src/img/";

// 클라이언트 단에서 표시되는 데이터의 형식
const dataToElement = (dataObj) => {
  return `
  <li class="app__products__item">
    <section class="app__products__item__image" style="background-image: url(${IMG_DIR_PATH}${dataObj.color}_${dataObj.category[0]}.png);"></section>
    <section class="app__products__item__desc">
      <section class="app_products__item__name app_products__item__gender-size">${dataObj.gender}, ${dataObj.size}</section>
      <section>${dataObj.color} ${dataObj.material} ${dataObj.category}</section>
    </section>
  </li>
  `.trim();
};

module.exports = dataToElement;

},{}],3:[function(require,module,exports){
/* --------------------------------------------------------------------------------------- */
/* 클라이언트 단에서 현재 페이지 넘버와 함께 데이터를 요청하는 부분을 가정한 구현 */
/* --------------------------------------------------------------------------------------- */
/* Module */
const request = require("../../fakeServer/fakeServer.js"); // 현재 페이지의 상품 데이터를 가져올 수 있는 험수 request()
const process = require("./_process.js"); // 파싱된 json 데이터를 가공하여 node element로 반환하는 함수 process()

/* Variables */
const PRODUCTS_NUM_PER_PAGE = 4; // 한 페이지에 표시되는 데이터 수
let currentPage = 1; // 현재 페이지 - default = page 1

/* Function */
const getProductsData = (pageNum) => {
  const getData = (pageNumber) => request(pageNumber, PRODUCTS_NUM_PER_PAGE); // 이동할 페이지의 데이터를 요청하는 함수

  currentPage = !isNaN(pageNum) ? pageNum : pageNum.textContent; // 클릭한 페이지 번호로 전역변수 currentPage를 설정하고

  return getData(currentPage); // 현재 페이지 번호로 데이터를 요청하여 반환
};

const putProductsList = (pageNum) => {
  const productsList = document.querySelector(".app__products__list"); // 상품리스트

  productsList.innerHTML = ""; // 상품리스트 초기화

  const productsData = JSON.parse(getProductsData(pageNum)); // json 형식의 데이터를 파싱
  const productsElem = productsData
    .map((productData) => process(productData))
    .reduce((allProductElem, productElem) => allProductElem.concat(productElem));

  productsList.innerHTML = productsElem;
};

const handlePageClick = (e) => {
  const pageNum = e.target;
  if (pageNum.tagName !== "LI" || pageNum.textContent == currentPage) return; // 클릭된게 번호가 아니거나 현재 페이지의 번호라면 종료

  putProductsList(pageNum);
};

const getPageData = () => {
  putProductsList(currentPage); // 최초 1회 불러오기

  const pageNumbers = document.querySelector(".app__products__page-numbers"); // 페이지네이션
  pageNumbers.addEventListener("click", handlePageClick, false); // 페이지네이션의 숫자 클릭시에 해당 페이지의 데이터 호출
};

/* export */
module.exports = getPageData;

},{"../../fakeServer/fakeServer.js":6,"./_process.js":2}],4:[function(require,module,exports){
/* 상품 옵션을 받아서 랜덤 데이터 생성 */
// TODO: 특정 버튼을 눌렀을때만 새로운 데이터를 생성하도록 변경하기 (현재는 새로고침 할때마다 데이터가 변경되어버림)
const productsOptions = require("./_productsOptions.js");

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

const fakeProductsData = [];

for (let i = 0; i < NUMBER_OF_PRODUCTS; i++) fakeProductsData.push(createFakeData(productsOptions));

module.exports = fakeProductsData;

},{"./_productsOptions.js":5}],5:[function(require,module,exports){
// gender - man, female
// category - t-shirt, pants, skirt
// size - small, big
// material - smooth, tough
// color - blue, yellow, pink
const productsOptions = {
  gender: ["man", "female"],
  category: ["t-shirt", "pants", "skirt"],
  size: ["small", "big"],
  material: ["smooth", "tough"],
  color: ["blue", "yellow", "pink"],
};

module.exports = productsOptions;

},{}],6:[function(require,module,exports){
/* --------------------------------------------------------------------------------------- */
/* 서버단에서 현재 페이지 넘버에 따라 DB에서 데이터를 가져와서 응답하는 부분을 가정한 구현 */
/* --------------------------------------------------------------------------------------- */
const DB = require("./_createFakeData.js"); // 가상 데이터 객체를 DataBase 라고 가정

const reqCurrentPageData = (currPage, dataNumPerPage) => {
  console.log(`[ page ${currPage} ]`); // test

  const offset = (currPage - 1) * dataNumPerPage; // 표시할 데이터 중 첫번째 데이터의 좌표
  const currentPageData = [];

  // 현재 좌표에서 시작하여 설정된 숫자만큼의 데이터 가져오기
  for (let i = offset; i < offset + dataNumPerPage; i++) {
    currentPageData.push(DB[i]);
  }

  return JSON.stringify(currentPageData); // 데이터 json 형식으로 반환
};

module.exports = reqCurrentPageData; // 데이터를 가져올 수 있는 위 함수를 클라이언트에서 쓸 수 있도록 전달

},{"./_createFakeData.js":4}]},{},[1]);
