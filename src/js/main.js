// 서버단에서 현재 페이지 넘버에 따라 DB에서 데이터를 가져와서 응답하는 부분을 가정한 구현
import { fakeProductsData as DB } from "./createFakeData.js"; // 가상 데이터 객체를 DataBase 라고 가정

const getCurrentPageData = (currPage, productsNumPerPage) => {
  let offset = currPage * productsNumPerPage - 1; // 표시할 데이터 중 첫번째 데이터의 좌표
  let currentPageData = [];

  for (let i = offset; i < offset + productsNumPerPage; i++) {
    currentPageData.push(DB[i]);
  }

  return currentPageData;
};

// 클라이언트 단에서 현재 페이지 넘버와 함께 데이터를 요청하는 부분을 가정한 구현

// 클라이언트 단에서 해당 데이터를 받아 정제과정을 거친 후 화면에 출력
