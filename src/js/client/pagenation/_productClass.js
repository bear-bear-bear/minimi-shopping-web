// 클라이언트 단에서 표시되는 데이터의 형식
class ProductToElement {
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

module.exports = ProductToElement;
