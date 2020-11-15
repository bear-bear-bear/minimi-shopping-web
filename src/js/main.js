/* --------------------------------------------------------------------------------------- */
/* 서버단에서 현재 페이지 넘버에 따라 DB에서 데이터를 가져와서 응답하는 부분을 가정한 구현 */
/* --------------------------------------------------------------------------------------- */
import { fakeProductsData as DB } from "./createFakeData.js"; // 가상 데이터 객체를 DataBase 라고 가정

const reqCurrentPageData = (currPage, dataNumPerPage) => {
  console.log(`[ page ${currPage} ]`); // test

  let offset = (currPage - 1) * dataNumPerPage; // 표시할 데이터 중 첫번째 데이터의 좌표
  let currentPageData = [];

  // 현재 좌표에서 시작하여 설정된 숫자만큼의 데이터 가져오기
  for (let i = offset; i < offset + dataNumPerPage; i++) {
    currentPageData.push(DB[i]);
  }

  return currentPageData; // 데이터 반환
};

/* --------------------------------------------------------------------------------------- */
/* 클라이언트 단에서 현재 페이지 넘버와 함께 데이터를 요청하는 부분을 가정한 구현 */
/* --------------------------------------------------------------------------------------- */
const PRODUCTS_NUM_PER_PAGE = 4; // 한 페이지에 표시되는 데이터 수
let currentPage = 1; // 현재 페이지 - default = page 1

// 클라이언트 단에서 표시되는 데이터의 형식
class ProductElement {
  constructor(dataObj) {
    /* 제품 정보 DOM 형식 */
  }

  getNode() {
    // return this.li;
  }
}

const processData = (data) => {
  let product = new ProductElement(data);

  return product.getNode();
};

const getProductsData = (pageNum) => {
  const getData = (pageNumber) => reqCurrentPageData(pageNumber, PRODUCTS_NUM_PER_PAGE); // 이동할 페이지의 데이터를 요청하는 함수

  currentPage = !isNaN(pageNum) ? pageNum : pageNum.textContent; // 클릭한 페이지 번호로 전역변수 currentPage를 설정하고

  return getData(currentPage); // 현재 페이지 번호로 데이터를 요청하여 반환
};

const getProductsList = (pageNum) => {
  let currProductsData = getProductsData(pageNum);
  console.log("-- 현재 페이지의 데이터 리스트");
  console.log(currProductsData);

  let currProductsElem = currProductsData.map((productData) => processData(productData));
  console.log("-- 현재 페이지의 데이터를 가공한 결과");
  console.log(currProductsElem);
};

const handlePageClick = (e) => {
  let pageNum = e.target;
  if (pageNum.tagName !== "LI" || pageNum.textContent == currentPage) return; // 클릭된게 번호가 아니거나 현재 페이지 번호라면 종료

  getProductsList(pageNum);
};

window.onload = () => {
  getProductsList(currentPage);

  const pageNumbers = document.querySelector(".app__products__page-numbers");
  pageNumbers.addEventListener("click", handlePageClick);
};

// 클라이언트 단에서 해당 데이터를 받아 정제과정을 거친 후 화면에 출력
