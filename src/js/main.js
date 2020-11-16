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

  return JSON.stringify(currentPageData); // 데이터 json 형식으로 반환
};

/* --------------------------------------------------------------------------------------- */
/* 클라이언트 단에서 현재 페이지 넘버와 함께 데이터를 요청하는 부분을 가정한 구현 */
/* --------------------------------------------------------------------------------------- */
const PRODUCTS_NUM_PER_PAGE = 4; // 한 페이지에 표시되는 데이터 수
let currentPage = 1; // 현재 페이지 - default = page 1

// 클라이언트 단에서 표시되는 데이터의 형식
class ProductElement {
  constructor(dataObj) {
    this.li = document.createElement("li");
    this.li.classList.add("app__products__item");

    this.section1 = document.createElement("section");
    this.section2 = document.createElement("section");
    this.section1.classList.add("app__products__item__image");
    this.section2.classList.add("app__products__item__desc");

    this.li.appendChild(this.section1);
    this.li.appendChild(this.section2);

    this.div1 = document.createElement("section");
    this.div2 = document.createElement("section");
    this.div1.classList.add("app_products__item__name");
    this.div1.classList.add("app_products__item__gender-size");
    this.div1.innerText = `${dataObj.gender}, ${dataObj.size}`;
    this.div2.innerText = `${dataObj.color} ${dataObj.material} ${dataObj.category}`;

    this.section2.appendChild(this.div1);
    this.section2.appendChild(this.div2);
  }

  getNode() {
    return this.li;
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

const clearInnerElement = (elem) => {
  elem.innerHTML = "";
};

const putProductsList = (pageNum) => {
  const productsList = document.querySelector(".app__products__list");

  clearInnerElement(productsList);

  let productsData = JSON.parse(getProductsData(pageNum)); // json 형식의 데이터를 파싱
  let productsElem = productsData.map((productData) => processData(productData)); // 파싱된 데이터를 DOM 엘리먼트 형식으로 가공

  for (let productElem of productsElem) {
    productsList.appendChild(productElem); // 상품리스트 ul에 가공한 상품데이터 추가
  }
};

const handlePageClick = (e) => {
  let pageNum = e.target;
  if (pageNum.tagName !== "LI" || pageNum.textContent == currentPage) return; // 클릭된게 번호가 아니거나 현재 페이지 번호라면 종료

  putProductsList(pageNum);
};

window.onload = () => {
  putProductsList(currentPage);

  const pageNumbers = document.querySelector(".app__products__page-numbers");
  pageNumbers.addEventListener("click", handlePageClick, false);
};

// 클라이언트 단에서 해당 데이터를 받아 정제과정을 거친 후 화면에 출력
