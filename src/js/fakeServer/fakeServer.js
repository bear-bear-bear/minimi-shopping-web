/* --------------------------------------------------------------------------------------- */
/* 서버단에서 현재 페이지 넘버에 따라 DB에서 데이터를 가져와서 응답하는 부분을 가정한 구현 */
/* --------------------------------------------------------------------------------------- */
const DB = require('./_createFakeData.js'); // 가상 데이터 객체를 DataBase 라고 가정
const TOTAL = DB.length;

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

module.exports.request = reqCurrentPageData; // 데이터를 가져올 수 있는 함수를 클라이언트에서 쓸 수 있도록 전달
module.exports.TOTAL = TOTAL; // 데이터의 총 개수를 클라이언트에서 쓸 수 있도록 전달
