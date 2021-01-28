/* --------------------------------------------------------------------------------------- */
/* 클라이언트 단에서 현재 페이지 넘버와 함께 데이터를 요청하는 부분을 가정한 구현 */
/* --------------------------------------------------------------------------------------- */
/* Module */
import { request, TOTAL } from '../fakeServer/fakeServer.js'; // 현재 페이지의 상품 데이터를 가져올 수 있는 험수 request(), 상품 데이터 전체 개수 TOTAL
import process from './_process.js'; // 파싱된 json 데이터를 가공하여 node element로 반환하는 함수 process()

/* Constants */
const PRODUCTS_NUM_PER_PAGE = 4; // 한 페이지에 표시되는 데이터 수

/* Global Variables */
const imagesWrap = document.body.querySelectorAll('.app__select-color__image'); // 왼쪽 상단 작은 옷 이미지들을 자식으로 가진 element
const colorsWrap = document.body.querySelector('.app__select-color__btn-list'); // 컬러 버튼들을 자식으로 가진 element
const pagination = document.body.querySelector('.app__products__inner-paging'); // 페이지네이션 버튼들을 자식으로 가진 element
const pageNumbers = Array.from(pagination.querySelectorAll('.app__products__page-number')); // 페이지네이션의 숫자 버튼들

let LAST_PAGE = Math.ceil(TOTAL / PRODUCTS_NUM_PER_PAGE); // 전체 페이지 수 (전체 데이터 개수인 TOTAL이 컬러에 따라 가변적)
let currentPageNumber = 1; // 현재 페이지 - default = page 1
let currentColor = null;

/* Function */
const initLastPage = () => {
  LAST_PAGE = Math.ceil(TOTAL / PRODUCTS_NUM_PER_PAGE);
};

const getProductsData = (pageNumber, color = null) => {
  const getData = (pageNum, color) => request(pageNum, PRODUCTS_NUM_PER_PAGE, color); // 이동할 페이지의 데이터를 요청하는 함수

  return getData(pageNumber, color); // 현재 페이지 번호로 데이터를 요청하여 반환
};

const toggleDisplayMoveBtns = () => {
  const leftBtn = document.body.querySelector('.app__products__page-btn--left');
  if (currentPageNumber == 1) leftBtn.classList.add('app__products__page-btn--disabled');
  else leftBtn.classList.remove('app__products__page-btn--disabled');

  const rightBtn = document.body.querySelector('.app__products__page-btn--right');
  if (currentPageNumber == LAST_PAGE) rightBtn.classList.add('app__products__page-btn--disabled');
  else rightBtn.classList.remove('app__products__page-btn--disabled');
};

const toggleHighlightCurrPageNum = () => {
  pageNumbers.forEach((pageNum) => {
    if (pageNum.textContent == currentPageNumber)
      pageNum.classList.toggle('app__products__page-number--highlight'); // css 파일에서 페이지 넘버 강조 스타일이 적용된 클래스 네임
  });
};

const putProductsList = (pageNum, color = null) => {
  const productsList = document.body.querySelector('.app__products__list'); // 상품리스트

  productsList.innerHTML = ''; // 상품리스트 초기화

  currentPageNumber = !isNaN(pageNum) // 클릭한 페이지 번호로 전역변수 currentPageNumber를 설정하는데,
    ? pageNum // pageNum가 숫자라면 그대로,
    : pageNum.textContent; // element라면 textContent로 값 삽입)

  const productsData = JSON.parse(getProductsData(currentPageNumber, color)); // json 형식의 데이터를 파싱, 전역변수 currentPageNumber는 변경됨
  const productsElem = productsData
    .map((productData) => process(productData))
    .reduce((allProductElem, productElem) => allProductElem.concat(productElem));

  productsList.innerHTML = productsElem; // 데이터 삽입
};

const turnPage = (clickedBtn = null) => {
  // | < 1 2 3 4 5 > | 같이 5개 버튼을 가진 페이지 네이션이 있다고 할 때,
  // 이 페이지의 버튼 개수는 5개, 초기 '중간 위치 이후 번호'는 3이라 한다. (중간 위치 이후 번호는 아래부터 중간 번호라고 칭한다)
  // 이 페이지 네이션의 페이지 전체 개수가 25개 라고 가정할 때,
  // 다음과 같이 동작하도록 구현한다.
  // 기본적으로는 클릭한 숫자가 가운데로 오게 하며, 아래와 같은 경우는 예외로 한다.
  // 현재 페이지가 1, 2, 3 인 경우엔 1이 페이지네이션을 | < 1 2 3 4 5 > | 로 고정한다. (숫자 클릭시에 음수로 가지 않게 설정한다)
  // 현재 페이지가 25, 24, 23 인 경우엔, | < 21 22 23 24 25 > | 로 고정한다. (숫자 클릭시에 최대 페이지 수를 초과하지 않도록 설정한다)

  const numBtnCnt = pageNumbers.length; // 숫자 버튼의 개수
  const nums = pageNumbers.map((pagenum) => parseInt(pagenum.textContent)); // 숫자 버튼의 숫자 목록

  const center = Math.ceil(numBtnCnt / 2) - 1; // 숫자 버튼을 리스트 중 가운데 번호의 인덱스
  const midPrev = numBtnCnt % 2 === 1 ? center : center - 1; // 정중앙에서 왼쪽 방향으로 가장 먼저 오는 번호의 인덱스
  const midNext = numBtnCnt % 2 === 1 ? center : center + 1; // 정중앙에서 오른쪽 방향으로 가장 먼저 오는 번호의 인덱스

  const midPrevNum = nums[midPrev]; // 정중앙에서 왼쪽 방향으로 가장 먼저 오는 번호
  const midNextNum = nums[midNext]; // 정중앙에서 오른쪽 방향으로 가장 먼저 오는 번호
  const firstBtnNum = nums[0]; // 첫번째 숫자 버튼의 숫자
  const lastBtnNum = nums[numBtnCnt - 1]; // 마지막 숫자 버튼의 숫자

  const changePageNumsValue = (num) => {
    // 전달된 숫자만큼 페이지네이션 번호 전체를 더하는 함수 ( 음수 전달시 뺄셈이 됨 )
    if (firstBtnNum + num < 1) {
      // 계산결과 첫번째 버튼이 페이지 1 아래로 내려가려 한다면
      pageNumbers.forEach((pageNum, i) => (pageNum.textContent = i + 1));
      // ( ex - | < 1 2 3 4 5 > | ) 첫 페이지에 고정하고 종료
      return;
    } //
    else if (lastBtnNum + num > LAST_PAGE) {
      // 계산결과 마지막 버튼이 최종 페이지보다 위로 올라가려 한다면
      pageNumbers.forEach((pageNum, i) => (pageNum.textContent = LAST_PAGE - numBtnCnt + i + 1));
      // ( ex - | < 21 22 23 24 25 > | ) 최종 페이지에 고정하고 종료
      return;
    } //
    else {
      // 계산 결과에 문제가 없다면
      // 전달된 숫자만큼 페이지네이션 번호 전체를 더하거나 빼기
      pageNumbers.forEach((pageNum) => {
        pageNum.textContent = parseInt(pageNum.textContent) + num;
      });
    }
  };

  const clicked = clickedBtn?.textContent;

  switch (clicked) {
    case '이전 페이지': // < 버튼 일때
      if (firstBtnNum !== 1 && currentPageNumber <= midPrevNum) {
        // 처음 버튼이 1이 아니고
        // 현재 페이지 번호가 가운데 숫자보다 작거나 같은 경우에만 모든 페이지 번호를 -1
        // (번호 개수가 짝수일땐 가운데 이전 숫자)
        changePageNumsValue(-1);
      }
      currentPageNumber--; // 전역변수 currentPageNumber를 -1
      break;

    case '다음 페이지': // > 버튼 일때
      if (lastBtnNum !== LAST_PAGE && currentPageNumber >= midNextNum) {
        // 마지막 버튼이 마지막 페이지의 번호가 아니고
        // 현재 페이지 번호가 가운데 숫자보다 크거나 같은 경우에만 모든 페이지 번호를 +1
        // (번호 개수가 짝수일땐 가운데 다음 숫자)
        changePageNumsValue(+1);
      }
      currentPageNumber++; // 전역변수 currentPageNumber를 +1
      break;

    default:
      if (Number.isInteger(Number(clicked))) {
        // 페이지네이션의 숫자 버튼일때
        const clickedNum = parseInt(clickedBtn.textContent); // 클릭한 숫자버튼의 숫자
        const diff = clickedNum - currentPageNumber; // 클릭한 숫자와 현재 페이지와의 차이

        changePageNumsValue(clickedNum - midNextNum); // (클릭한 숫자 - midNextNum) 만큼 모든 페이지 번호를 변경.
        // < 1 2 3 4 5 > 를 예로 들면, midNextNum은 3이 나옴
        // 1. < 1 2 >
        // < 1 2 > 를 클릭하면 (클릭한 숫자 - midNextNum) 가 음수가 나오는데,
        // 전달된 숫자만큼 전체 페이지를 이동시키는 changePageNumsValue 에서 페이지를 1 밑으로 떨어뜨릴 수 없게 제어함
        // 페이지 목록이 < 1 2 3 4 5 > 로 유지됨
        // 2. < 3 >
        // < 3 > 을 클릭하면 (클릭한 숫자 - midNextNum) 는 0.
        // 페이지 목록이 < 1 2 3 4 5 > 로 유지됨
        // 3. < 4 5 >
        // < 4 5 > 를 클릭하면 (클릭한 숫자 - midNextNum) 는 양수가 되고,
        // changePageNumsValue 에서 전달된 숫자만큼 전체 페이지 목록을 변경시켜서
        // 클릭한 숫자가 목록의 가운데 오게 만듬

        currentPageNumber += diff; // 전역변수 currentPageNumber를 클릭한 숫자와 현재 페이지와의 차이만큼 변경
      } else {
        // 컬러 선택 버튼일때
        pageNumbers.forEach((pageNum, i) => (pageNum.textContent = i + 1));
      }
  }
};

const handlePaginationBtnsClick = (e) => {
  let clickedBtn = e.target;

  if (clickedBtn.tagName === 'UL') return; // 클릭된 것이 버튼이 아닌 여백 공간이라면 종료
  if (clickedBtn.tagName === 'LI' && clickedBtn.textContent == currentPageNumber) return; // 클릭된 것이 현재 페이지 번호일땐 종료
  if (clickedBtn.tagName === 'path') clickedBtn = e.target.closest('svg'); // 클릭된 것이 svg의 path라면 svg로 이벤트 타겟 변경

  initLastPage();
  toggleHighlightCurrPageNum(); // 이전 페이지 번호 강조 off
  turnPage(clickedBtn); // 페이지 넘기기 (currentPageNumber 변경)
  putProductsList(currentPageNumber, currentColor); // 변경한 currentPageNumber로 그에 맞는 데이터 불러오기
  toggleHighlightCurrPageNum(); // 현재 페이지 번호 강조 on
  toggleDisplayMoveBtns(); // 만약 현재 페이지가 1페이지면 < 버튼, 마지막 페이지면 > 버튼 삭제
};

const setColor = (color) => {
  currentColor = color;
  imagesWrap.forEach((imageElem, idx) => {
    const categorys = ['t', 'p', 's']; // 티셔츠, 팬츠, 스커트. 의존성 대박..
    imageElem.style.backgroundImage = `url(/src/img/${color}_${categorys[idx]}.png)`;
  });
};

const handleColorBtnsClick = (e) => {
  if (e.target.tagName !== 'LI') return;

  const color = e.target.className.match(/(?<=--)[a-z]+$/)[0]; // 현재 색상 변경 - 'blue' or 'yellow' or 'pink'

  if (currentColor === color) return;

  setColor(color);
  initLastPage();
  toggleHighlightCurrPageNum(); // 이전 페이지 번호 강조 off
  currentPageNumber = 1; // 페이지 번호(변수) 초기화 (currentPageNumber 초기화)
  turnPage(); // 페이지 번호(element) 초기화
  putProductsList(currentPageNumber, currentColor); // 색상에 맞는 데이터 불러오기
  toggleHighlightCurrPageNum(); // 현재 페이지 번호 강조 on
  toggleDisplayMoveBtns(); // 만약 현재 페이지가 1페이지면 < 버튼, 마지막 페이지면 > 버튼 삭제
};

const onPagination = () => {
  toggleDisplayMoveBtns(); // 웹 페이지 최초 접속시에 < , > 버튼 삭제 판별 (1페이지 혹은 마지막 페이지 일때)
  toggleHighlightCurrPageNum(); // 웹 페이지 최초 접속시에 현재 페이지 강조
  putProductsList(currentPageNumber); // 웹페이지 최초 접속시에 데이터 불러오기

  colorsWrap.addEventListener('click', handleColorBtnsClick, false); // 컬러 버튼 클릭시에 그에 맞는 데이터 호출
  pagination.addEventListener('click', handlePaginationBtnsClick, false); // 페이지네이션의 버튼 클릭시에 그에 맞는 데이터 호출
};

/* export */
export default onPagination;
