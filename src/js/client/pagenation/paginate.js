/* --------------------------------------------------------------------------------------- */
/* 클라이언트 단에서 현재 페이지 넘버와 함께 데이터를 요청하는 부분을 가정한 구현 */
/* --------------------------------------------------------------------------------------- */
/* Module */
const request = require("../../fakeServer/fakeServer.js"); // 현재 페이지의 상품 데이터를 가져올 수 있는 험수 request()
const process = require("./_process.js"); // 파싱된 json 데이터를 가공하여 node element로 반환하는 함수 process()

/* Variables */
const PRODUCTS_NUM_PER_PAGE = 4; // 한 페이지에 표시되는 데이터 수
const PAGE_NUMBER_HIGHLIGHT_CLASSNAME = "app__products__page-number--highlight"; // css 파일에서 페이지 넘버 강조 스타일이 적용된 클래스 네임
let currentPageNumber = 1; // 현재 페이지 - default = page 1

/* Function */
const getProductsData = (pageNumber) => {
  const getData = (pageNum) => request(pageNum, PRODUCTS_NUM_PER_PAGE); // 이동할 페이지의 데이터를 요청하는 함수

  currentPageNumber = !isNaN(pageNumber) ? pageNumber : pageNumber.textContent; // 클릭한 페이지 번호로 전역변수 currentPageNumber를 설정하고

  return getData(currentPageNumber); // 현재 페이지 번호로 데이터를 요청하여 반환
};

const toggleHighlightPageNumber = (pageNumber) => {
  const pageNumbers = Array.from(document.querySelector(".app__products__page-numbers").children); // 페이지네이션

  const currPageNumber = pageNumbers[pageNumber - 1]; // 현재 페이지 인덱스는 입력한 페이지 숫자 인수의 - 1
  currPageNumber.classList.toggle(PAGE_NUMBER_HIGHLIGHT_CLASSNAME);
};

const putProductsList = (pageNum) => {
  const productsList = document.querySelector(".app__products__list"); // 상품리스트

  productsList.innerHTML = ""; // 상품리스트 초기화

  toggleHighlightPageNumber(currentPageNumber); // 이전 페이지 강조 off

  const productsData = JSON.parse(getProductsData(pageNum)); // json 형식의 데이터를 파싱, 전역변수 currentPageNumber는 변경됨
  const productsElem = productsData
    .map((productData) => process(productData))
    .reduce((allProductElem, productElem) => allProductElem.concat(productElem));

  productsList.innerHTML = productsElem; // 데이터 삽입

  toggleHighlightPageNumber(currentPageNumber); // 현재 페이지 강조 on
};

const handlePaginationBtnsClick = (e) => {
  const clickedBtn = e.target;

  if (clickedBtn.tagName === "svg") console.log("clicked move button!");

  if (clickedBtn.tagName !== "LI" || clickedBtn.textContent == currentPageNumber) return; // 클릭된게 번호가 아니거나 현재 페이지의 번호라면 종료

  putProductsList(clickedBtn);
};

const getPageData = () => {
  toggleHighlightPageNumber(currentPageNumber); // 웹 페이지 최초 접속시에 현재 페이지 강조
  putProductsList(currentPageNumber); // 웹페이지 최초 접속시에 데이터 불러오기

  const paginationBtns = document.querySelector(".app__products__inner-paging"); // 페이지네이션
  paginationBtns.addEventListener("click", handlePaginationBtnsClick, false); // 페이지네이션의 버튼 클릭시에 그에 맞는 데이터 호출
};

/* export */
module.exports = getPageData;
