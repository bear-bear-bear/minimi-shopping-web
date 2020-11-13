import { fakeProductsData as fakeData } from "./createFakeData.js";

class Clothes {
  constructor(category, gender, size, material, color) {
    this.category = category;
    this.gender = gender;
    this.size = size;
    this.material = material;
    this.color = color;
  }

  log() {
    console.log(this.color);
  }
}

const clothes = new Clothes("t-shirt", "man", "big", "tough", "red");

clothes.log(); // Clothes class test

console.log(fakeData); // fakeData object test
