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

const clearInnerElement = (elem) => {
  elem.innerHTML = "";
};

const putProductsList = (pageNum) => {
  const productsList = document.querySelector(".app__products__list"); // 상품리스트

  clearInnerElement(productsList); // 상품리스트 초기화

  let productsData = JSON.parse(getProductsData(pageNum)); // json 형식의 데이터를 파싱
  let productsElem = productsData.map((productData) => process(productData)); // 파싱된 데이터를 DOM 엘리먼트 형식으로 가공

  for (let productElem of productsElem) {
    productsList.appendChild(productElem); // 상품리스트에 가공한 상품데이터를 차례대로 추가
  }
};

const handlePageClick = (e) => {
  let pageNum = e.target;
  if (pageNum.tagName !== "LI" || pageNum.textContent == currentPage) return; // 클릭된게 번호가 아니거나 현재 페이지의 번호라면 종료

  putProductsList(pageNum);
};

const getPageData = () => {
  putProductsList(currentPage); // 최초 1회 불러오기

  const pageNumbers = document.querySelector(".app__products__page-numbers"); // 페이지네이션
  pageNumbers.addEventListener("click", handlePageClick, false); // 페이지네이션의 숫자 클릭시에 해당 페이지의 데이터 호출
};

module.exports = getPageData;
