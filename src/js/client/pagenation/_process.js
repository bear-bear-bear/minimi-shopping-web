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
