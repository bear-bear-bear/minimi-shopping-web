/* --------------------------------------------------------------------------------------- */
/* 클라이언트 단에서 현재 페이지 넘버와 함께 데이터를 요청하는 부분을 가정한 구현 */
/* --------------------------------------------------------------------------------------- */
/* Module */
const { request, TOTAL } = require("../../fakeServer/fakeServer.js"); // 현재 페이지의 상품 데이터를 가져올 수 있는 험수 request(), 상품 데이터 전체 개수 TOTAL
const process = require("./_process.js"); // 파싱된 json 데이터를 가공하여 node element로 반환하는 함수 process()

/* Constants */
const PRODUCTS_NUM_PER_PAGE = 4; // 한 페이지에 표시되는 데이터 수
const PAGE_CNT = Math.ceil(TOTAL / PRODUCTS_NUM_PER_PAGE); // 전체 페이지 수

/* Global Variables */
const pagination = document.body.querySelector(".app__products__inner-paging"); // 페이지네이션 버튼들을 자식으로 가진 element
const pageNumbers = Array.from(pagination.querySelector(".app__products__page-numbers").children); // 페이지네이션의 숫자 버튼들

let currentPageNumber = 1; // 현재 페이지 - default = page 1

/* Function */
const getProductsData = (pageNumber) => {
  const getData = (pageNum) => request(pageNum, PRODUCTS_NUM_PER_PAGE); // 이동할 페이지의 데이터를 요청하는 함수

  return getData(pageNumber); // 현재 페이지 번호로 데이터를 요청하여 반환
};

const toggleDisplayMoveBtns = () => {
  const leftBtn = document.body.querySelector(".app__products__page-btn--left");
  if (currentPageNumber == 1) leftBtn.classList.add("app__products__page-btn--disabled");
  else leftBtn.classList.remove("app__products__page-btn--disabled");

  const rightBtn = document.body.querySelector(".app__products__page-btn--right");
  if (currentPageNumber == PAGE_CNT) rightBtn.classList.add("app__products__page-btn--disabled");
  else rightBtn.classList.remove("app__products__page-btn--disabled");
};

const toggleHighlightCurrPageNum = () => {
  pageNumbers.forEach((pageNum) => {
    if (pageNum.textContent == currentPageNumber)
      pageNum.classList.toggle("app__products__page-number--highlight"); // css 파일에서 페이지 넘버 강조 스타일이 적용된 클래스 네임
  });
};

const putProductsList = (pageNum) => {
  const productsList = document.body.querySelector(".app__products__list"); // 상품리스트

  productsList.innerHTML = ""; // 상품리스트 초기화

  currentPageNumber = !isNaN(pageNum) // 클릭한 페이지 번호로 전역변수 currentPageNumber를 설정하는데,
    ? pageNum // pageNum가 숫자라면 그대로,
    : pageNum.textContent; // element라면 textContent로 값 삽입)

  const productsData = JSON.parse(getProductsData(currentPageNumber)); // json 형식의 데이터를 파싱, 전역변수 currentPageNumber는 변경됨
  const productsElem = productsData
    .map((productData) => process(productData))
    .reduce((allProductElem, productElem) => allProductElem.concat(productElem));

  productsList.innerHTML = productsElem; // 데이터 삽입
};

const turnPage = (clickedBtn) => {
  const numBtnCnt = pageNumbers.length; // 숫자 버튼의 개수

  const midNext = // 숫자 버튼을 리스트 중 가운데 위치의 다음 숫자 인덱스는
    numBtnCnt % 2 === 0 // 숫자 버튼 개수가 짝수면
      ? Math.ceil(numBtnCnt / 2) // 가운데가 공백이므로 다음은 가운데 이후 1번째 숫자 (인덱스를 구하는 거라 +1가 아닌 -1)
      : Math.ceil(numBtnCnt / 2) - 1; // 숫자 버튼 개수가 홀수면 가운데가 숫자이므로 가운데 이후 0번째 숫자 (인덱스를 구하는 거라 0이 아닌 -1)

  const midNextNum = parseInt(pageNumbers[midNext].textContent); // 가운데 위치 바로 이후에 나오는 숫자
  const firstBtnNum = parseInt(pageNumbers[0].textContent); // 첫번째 숫자 버튼의 숫자
  const lastBtnNum = parseInt(pageNumbers[numBtnCnt - 1].textContent); // 마지막 숫자 버튼의 숫자

  const changePageNumsValue = (num) => {
    pageNumbers.forEach((pageNum) => {
      pageNum.textContent = parseInt(pageNum.textContent) + num;
    });
  };

  switch (clickedBtn.textContent) {
    case "이전 페이지":
      if (firstBtnNum !== 1 && currentPageNumber <= midNextNum) {
        // 처음 버튼의 숫자가 1이 아니고
        // 현재 페이지 번호가 가운데 다음 숫자보다 작거나 같은 경우에만 모든 페이지 번호를 -1
        changePageNumsValue(-1);
      }
      currentPageNumber--;
      break;
    case "다음 페이지":
      if (lastBtnNum !== PAGE_CNT && currentPageNumber >= midNextNum) {
        // 마지막 버튼의 숫자가 마지막 페이지가 아니고
        // 현재 페이지 번호가 가운데 다음 숫자보다 크거나 같은 경우에만 모든 페이지 번호를 +1
        changePageNumsValue(+1);
      }
      currentPageNumber++;
      break;
    default:
      // 숫자 버튼일 경우에
      const clickedNum = parseInt(clickedBtn.textContent); // 클릭한 숫자버튼의 숫자
      const diff = clickedNum - currentPageNumber; // 현재 페이지와의 차이

      if (diff < 0) {
        if (firstBtnNum !== 1 && currentPageNumber <= midNextNum) {
          changePageNumsValue(diff);
        }
      } else if (diff > 0) {
        if (lastBtnNum !== PAGE_CNT && currentPageNumber >= midNextNum) {
          changePageNumsValue(diff);
        }
      }
      currentPageNumber += diff;
  }
};

const handlePaginationBtnsClick = (e) => {
  let clickedBtn = e.target;

  if (clickedBtn.tagName === "UL") return; // 클릭된 것이 버튼이 아닌 여백 공간이라면 종료
  if (clickedBtn.tagName === "LI" && clickedBtn.textContent == currentPageNumber) return; // 클릭된 것이 현재 페이지 번호일땐 종료
  if (clickedBtn.tagName === "path") clickedBtn = e.target.closest("svg"); // 클릭된 것이 svg의 path라면 svg로 이벤트 타겟 변경

  toggleHighlightCurrPageNum(); // 이전 페이지 번호 강조 off
  turnPage(clickedBtn); // 현재 페이지 번호 변경 (currentPageNumber 변경)
  putProductsList(currentPageNumber); // 변경한 currentPageNumber로 그에 맞는 데이터 불러오기
  toggleHighlightCurrPageNum(); // 현재 페이지 번호 강조 on
  toggleDisplayMoveBtns(); // 만약 현재 페이지가 1페이지면 < 버튼, 마지막 페이지면 > 버튼 삭제
};

const getPageData = () => {
  toggleDisplayMoveBtns(); // 웹 페이지 최초 접속시에 < , > 버튼 삭제 판별 (1페이지 혹은 마지막 페이지 일때)
  toggleHighlightCurrPageNum(); // 웹 페이지 최초 접속시에 현재 페이지 강조
  putProductsList(currentPageNumber); // 웹페이지 최초 접속시에 데이터 불러오기

  pagination.addEventListener("click", handlePaginationBtnsClick, false); // 페이지네이션의 버튼 클릭시에 그에 맞는 데이터 호출
};

/* export */
module.exports = getPageData;
