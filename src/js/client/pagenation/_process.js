// 클라이언트 단에서 표시되는 데이터의 형식
const dataToElement = (dataObj) => {
  let li = document.createElement("li");
  li.classList.add("app__products__item");

  let section1 = document.createElement("section");
  let section2 = document.createElement("section");
  section1.classList.add("app__products__item__image");
  section2.classList.add("app__products__item__desc");

  li.appendChild(section1);
  li.appendChild(section2);

  let div1 = document.createElement("section");
  let div2 = document.createElement("section");
  div1.classList.add("app_products__item__name");
  div1.classList.add("app_products__item__gender-size");
  div1.innerText = `${dataObj.gender}, ${dataObj.size}`;
  div2.innerText = `${dataObj.color} ${dataObj.material} ${dataObj.category}`;

  section2.appendChild(div1);
  section2.appendChild(div2);

  return li;
};

const processData = (data) => {
  return dataToElement(data);
};

module.exports = processData;
