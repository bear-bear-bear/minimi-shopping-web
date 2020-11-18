// index.html 파일 기준 이미지 디렉터리 경로
const IMG_DIR_PATH = "./src/img/";

// 클라이언트 단에서 표시되는 데이터의 형식
const dataToElement = (dataObj) => {
  const li = document.createElement("li");
  li.classList.add("app__products__item");

  const section1 = document.createElement("section");
  const section2 = document.createElement("section");
  section1.classList.add("app__products__item__image");
  section2.classList.add("app__products__item__desc");

  li.appendChild(section1);
  li.appendChild(section2);

  const div1 = document.createElement("section");
  const div2 = document.createElement("section");
  div1.classList.add("app_products__item__name");
  div1.classList.add("app_products__item__gender-size");
  div1.innerText = `${dataObj.gender}, ${dataObj.size}`;
  div2.innerText = `${dataObj.color} ${dataObj.material} ${dataObj.category}`;

  section2.appendChild(div1);
  section2.appendChild(div2);

  const setImage = (color, category) => {
    // 색상과 카테고리에 맞는 이미지 세팅
    section1.style.backgroundImage = `url(${IMG_DIR_PATH}${color}_${category[0]}.png)`;
  };

  setImage(dataObj.color, dataObj.category);

  return li;
};

const processData = (data) => {
  return dataToElement(data);
};

module.exports = processData;
