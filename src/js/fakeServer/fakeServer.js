/* --------------------------------------------------------------------------------------- */
/* 서버단에서 현재 페이지 넘버에 따라 DB에서 데이터를 가져와서 응답하는 부분을 가정한 구현 */
/* --------------------------------------------------------------------------------------- */
import { DB, returnData } from './_createFakeData.js'; // 가상 데이터 객체를 DataBase 라고 가정
let TOTAL = DB.length; // 컬러에 따라 가변적

const reqCurrentPageData = (currPage, dataNumPerPage, color = null) => {
  console.log(`[ page ${currPage} ]`); // test

  const offset = (currPage - 1) * dataNumPerPage; // 표시할 데이터 중 첫번째 데이터의 좌표
  const currentPageData = [];

  // 현재 좌표에서 시작하여 설정된 숫자만큼의 데이터 가져오기
  const data = returnData(color);
  TOTAL = data.length;

  for (let i = offset; i < offset + dataNumPerPage; i++) {
    currentPageData.push(data[i]);
  }

  return JSON.stringify(currentPageData); // 데이터 json 형식으로 반환
};

// reqCurrentPageData => 데이터를 가져올 수 있는 함수를 클라이언트에서 쓸 수 있도록 전달
// TOTAL => 데이터의 총 개수를 클라이언트에서 쓸 수 있도록 전달
export { reqCurrentPageData as request, TOTAL };
