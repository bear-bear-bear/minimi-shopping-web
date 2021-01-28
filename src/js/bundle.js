/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/client/client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/client/_onPagination.js":
/*!****************************************!*\
  !*** ./src/js/client/_onPagination.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fakeServer_fakeServer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../fakeServer/fakeServer.js */ \"./src/js/fakeServer/fakeServer.js\");\n/* harmony import */ var _process_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_process.js */ \"./src/js/client/_process.js\");\n/* --------------------------------------------------------------------------------------- */\n\n/* 클라이언트 단에서 현재 페이지 넘버와 함께 데이터를 요청하는 부분을 가정한 구현 */\n\n/* --------------------------------------------------------------------------------------- */\n\n/* Module */\n // 현재 페이지의 상품 데이터를 가져올 수 있는 험수 request(), 상품 데이터 전체 개수 TOTAL\n\n // 파싱된 json 데이터를 가공하여 node element로 반환하는 함수 process()\n\n/* Constants */\n\nvar PRODUCTS_NUM_PER_PAGE = 4; // 한 페이지에 표시되는 데이터 수\n\n/* Global Variables */\n\nvar imagesWrap = document.body.querySelectorAll('.app__select-color__image'); // 왼쪽 상단 작은 옷 이미지들을 자식으로 가진 element\n\nvar colorsWrap = document.body.querySelector('.app__select-color__btn-list'); // 컬러 버튼들을 자식으로 가진 element\n\nvar pagination = document.body.querySelector('.app__products__inner-paging'); // 페이지네이션 버튼들을 자식으로 가진 element\n\nvar pageNumbers = Array.from(pagination.querySelectorAll('.app__products__page-number')); // 페이지네이션의 숫자 버튼들\n\nvar LAST_PAGE = Math.ceil(_fakeServer_fakeServer_js__WEBPACK_IMPORTED_MODULE_0__[\"TOTAL\"] / PRODUCTS_NUM_PER_PAGE); // 전체 페이지 수 (전체 데이터 개수인 TOTAL이 컬러에 따라 가변적)\n\nvar currentPageNumber = 1; // 현재 페이지 - default = page 1\n\nvar currentColor = null;\n/* Function */\n\nvar initLastPage = function initLastPage() {\n  LAST_PAGE = Math.ceil(_fakeServer_fakeServer_js__WEBPACK_IMPORTED_MODULE_0__[\"TOTAL\"] / PRODUCTS_NUM_PER_PAGE);\n};\n\nvar getProductsData = function getProductsData(pageNumber) {\n  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n\n  var getData = function getData(pageNum, color) {\n    return Object(_fakeServer_fakeServer_js__WEBPACK_IMPORTED_MODULE_0__[\"request\"])(pageNum, PRODUCTS_NUM_PER_PAGE, color);\n  }; // 이동할 페이지의 데이터를 요청하는 함수\n\n\n  return getData(pageNumber, color); // 현재 페이지 번호로 데이터를 요청하여 반환\n};\n\nvar toggleDisplayMoveBtns = function toggleDisplayMoveBtns() {\n  var leftBtn = document.body.querySelector('.app__products__page-btn--left');\n  if (currentPageNumber == 1) leftBtn.classList.add('app__products__page-btn--disabled');else leftBtn.classList.remove('app__products__page-btn--disabled');\n  var rightBtn = document.body.querySelector('.app__products__page-btn--right');\n  if (currentPageNumber == LAST_PAGE) rightBtn.classList.add('app__products__page-btn--disabled');else rightBtn.classList.remove('app__products__page-btn--disabled');\n};\n\nvar toggleHighlightCurrPageNum = function toggleHighlightCurrPageNum() {\n  pageNumbers.forEach(function (pageNum) {\n    if (pageNum.textContent == currentPageNumber) pageNum.classList.toggle('app__products__page-number--highlight'); // css 파일에서 페이지 넘버 강조 스타일이 적용된 클래스 네임\n  });\n};\n\nvar putProductsList = function putProductsList(pageNum) {\n  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n  var productsList = document.body.querySelector('.app__products__list'); // 상품리스트\n\n  productsList.innerHTML = ''; // 상품리스트 초기화\n\n  currentPageNumber = !isNaN(pageNum) // 클릭한 페이지 번호로 전역변수 currentPageNumber를 설정하는데,\n  ? pageNum // pageNum가 숫자라면 그대로,\n  : pageNum.textContent; // element라면 textContent로 값 삽입)\n\n  var productsData = JSON.parse(getProductsData(currentPageNumber, color)); // json 형식의 데이터를 파싱, 전역변수 currentPageNumber는 변경됨\n\n  var productsElem = productsData.map(function (productData) {\n    return Object(_process_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(productData);\n  }).reduce(function (allProductElem, productElem) {\n    return allProductElem.concat(productElem);\n  });\n  productsList.innerHTML = productsElem; // 데이터 삽입\n};\n\nvar turnPage = function turnPage() {\n  var clickedBtn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n  // | < 1 2 3 4 5 > | 같이 5개 버튼을 가진 페이지 네이션이 있다고 할 때,\n  // 이 페이지의 버튼 개수는 5개, 초기 '중간 위치 이후 번호'는 3이라 한다. (중간 위치 이후 번호는 아래부터 중간 번호라고 칭한다)\n  // 이 페이지 네이션의 페이지 전체 개수가 25개 라고 가정할 때,\n  // 다음과 같이 동작하도록 구현한다.\n  // 기본적으로는 클릭한 숫자가 가운데로 오게 하며, 아래와 같은 경우는 예외로 한다.\n  // 현재 페이지가 1, 2, 3 인 경우엔 1이 페이지네이션을 | < 1 2 3 4 5 > | 로 고정한다. (숫자 클릭시에 음수로 가지 않게 설정한다)\n  // 현재 페이지가 25, 24, 23 인 경우엔, | < 21 22 23 24 25 > | 로 고정한다. (숫자 클릭시에 최대 페이지 수를 초과하지 않도록 설정한다)\n  var numBtnCnt = pageNumbers.length; // 숫자 버튼의 개수\n\n  var nums = pageNumbers.map(function (pagenum) {\n    return parseInt(pagenum.textContent);\n  }); // 숫자 버튼의 숫자 목록\n\n  var center = Math.ceil(numBtnCnt / 2) - 1; // 숫자 버튼을 리스트 중 가운데 번호의 인덱스\n\n  var midPrev = numBtnCnt % 2 === 1 ? center : center - 1; // 정중앙에서 왼쪽 방향으로 가장 먼저 오는 번호의 인덱스\n\n  var midNext = numBtnCnt % 2 === 1 ? center : center + 1; // 정중앙에서 오른쪽 방향으로 가장 먼저 오는 번호의 인덱스\n\n  var midPrevNum = nums[midPrev]; // 정중앙에서 왼쪽 방향으로 가장 먼저 오는 번호\n\n  var midNextNum = nums[midNext]; // 정중앙에서 오른쪽 방향으로 가장 먼저 오는 번호\n\n  var firstBtnNum = nums[0]; // 첫번째 숫자 버튼의 숫자\n\n  var lastBtnNum = nums[numBtnCnt - 1]; // 마지막 숫자 버튼의 숫자\n\n  var changePageNumsValue = function changePageNumsValue(num) {\n    // 전달된 숫자만큼 페이지네이션 번호 전체를 더하는 함수 ( 음수 전달시 뺄셈이 됨 )\n    if (firstBtnNum + num < 1) {\n      // 계산결과 첫번째 버튼이 페이지 1 아래로 내려가려 한다면\n      pageNumbers.forEach(function (pageNum, i) {\n        return pageNum.textContent = i + 1;\n      }); // ( ex - | < 1 2 3 4 5 > | ) 첫 페이지에 고정하고 종료\n\n      return;\n    } //\n    else if (lastBtnNum + num > LAST_PAGE) {\n        // 계산결과 마지막 버튼이 최종 페이지보다 위로 올라가려 한다면\n        pageNumbers.forEach(function (pageNum, i) {\n          return pageNum.textContent = LAST_PAGE - numBtnCnt + i + 1;\n        }); // ( ex - | < 21 22 23 24 25 > | ) 최종 페이지에 고정하고 종료\n\n        return;\n      } //\n      else {\n          // 계산 결과에 문제가 없다면\n          // 전달된 숫자만큼 페이지네이션 번호 전체를 더하거나 빼기\n          pageNumbers.forEach(function (pageNum) {\n            pageNum.textContent = parseInt(pageNum.textContent) + num;\n          });\n        }\n  };\n\n  var clicked = clickedBtn === null || clickedBtn === void 0 ? void 0 : clickedBtn.textContent;\n\n  switch (clicked) {\n    case '이전 페이지':\n      // < 버튼 일때\n      if (firstBtnNum !== 1 && currentPageNumber <= midPrevNum) {\n        // 처음 버튼이 1이 아니고\n        // 현재 페이지 번호가 가운데 숫자보다 작거나 같은 경우에만 모든 페이지 번호를 -1\n        // (번호 개수가 짝수일땐 가운데 이전 숫자)\n        changePageNumsValue(-1);\n      }\n\n      currentPageNumber--; // 전역변수 currentPageNumber를 -1\n\n      break;\n\n    case '다음 페이지':\n      // > 버튼 일때\n      if (lastBtnNum !== LAST_PAGE && currentPageNumber >= midNextNum) {\n        // 마지막 버튼이 마지막 페이지의 번호가 아니고\n        // 현재 페이지 번호가 가운데 숫자보다 크거나 같은 경우에만 모든 페이지 번호를 +1\n        // (번호 개수가 짝수일땐 가운데 다음 숫자)\n        changePageNumsValue(+1);\n      }\n\n      currentPageNumber++; // 전역변수 currentPageNumber를 +1\n\n      break;\n\n    default:\n      if (Number.isInteger(Number(clicked))) {\n        // 페이지네이션의 숫자 버튼일때\n        var clickedNum = parseInt(clickedBtn.textContent); // 클릭한 숫자버튼의 숫자\n\n        var diff = clickedNum - currentPageNumber; // 클릭한 숫자와 현재 페이지와의 차이\n\n        changePageNumsValue(clickedNum - midNextNum); // (클릭한 숫자 - midNextNum) 만큼 모든 페이지 번호를 변경.\n        // < 1 2 3 4 5 > 를 예로 들면, midNextNum은 3이 나옴\n        // 1. < 1 2 >\n        // < 1 2 > 를 클릭하면 (클릭한 숫자 - midNextNum) 가 음수가 나오는데,\n        // 전달된 숫자만큼 전체 페이지를 이동시키는 changePageNumsValue 에서 페이지를 1 밑으로 떨어뜨릴 수 없게 제어함\n        // 페이지 목록이 < 1 2 3 4 5 > 로 유지됨\n        // 2. < 3 >\n        // < 3 > 을 클릭하면 (클릭한 숫자 - midNextNum) 는 0.\n        // 페이지 목록이 < 1 2 3 4 5 > 로 유지됨\n        // 3. < 4 5 >\n        // < 4 5 > 를 클릭하면 (클릭한 숫자 - midNextNum) 는 양수가 되고,\n        // changePageNumsValue 에서 전달된 숫자만큼 전체 페이지 목록을 변경시켜서\n        // 클릭한 숫자가 목록의 가운데 오게 만듬\n\n        currentPageNumber += diff; // 전역변수 currentPageNumber를 클릭한 숫자와 현재 페이지와의 차이만큼 변경\n      } else {\n        // 컬러 선택 버튼일때\n        pageNumbers.forEach(function (pageNum, i) {\n          return pageNum.textContent = i + 1;\n        });\n      }\n\n  }\n};\n\nvar handlePaginationBtnsClick = function handlePaginationBtnsClick(e) {\n  var clickedBtn = e.target;\n  if (clickedBtn.tagName === 'UL') return; // 클릭된 것이 버튼이 아닌 여백 공간이라면 종료\n\n  if (clickedBtn.tagName === 'LI' && clickedBtn.textContent == currentPageNumber) return; // 클릭된 것이 현재 페이지 번호일땐 종료\n\n  if (clickedBtn.tagName === 'path') clickedBtn = e.target.closest('svg'); // 클릭된 것이 svg의 path라면 svg로 이벤트 타겟 변경\n\n  initLastPage();\n  toggleHighlightCurrPageNum(); // 이전 페이지 번호 강조 off\n\n  turnPage(clickedBtn); // 페이지 넘기기 (currentPageNumber 변경)\n\n  putProductsList(currentPageNumber, currentColor); // 변경한 currentPageNumber로 그에 맞는 데이터 불러오기\n\n  toggleHighlightCurrPageNum(); // 현재 페이지 번호 강조 on\n\n  toggleDisplayMoveBtns(); // 만약 현재 페이지가 1페이지면 < 버튼, 마지막 페이지면 > 버튼 삭제\n};\n\nvar setColor = function setColor(color) {\n  currentColor = color; // 이미지 디렉터리 경로\n\n  var IMG_DIR_PATH = 'https://bear-bear-bear.github.io/minimi-shopping-web/src/img';\n  imagesWrap.forEach(function (imageElem, idx) {\n    var categorys = ['t', 'p', 's']; // 티셔츠, 팬츠, 스커트. 의존성 대박..\n\n    imageElem.style.backgroundImage = \"url(\".concat(IMG_DIR_PATH, \"/\").concat(color, \"_\").concat(categorys[idx], \".png)\");\n  });\n};\n\nvar handleColorBtnsClick = function handleColorBtnsClick(e) {\n  if (e.target.tagName !== 'LI') return;\n  var color = e.target.className.match(/(?<=--)[a-z]+$/)[0]; // 현재 색상 변경 - 'blue' or 'yellow' or 'pink'\n\n  if (currentColor === color) return;\n  setColor(color);\n  initLastPage();\n  toggleHighlightCurrPageNum(); // 이전 페이지 번호 강조 off\n\n  currentPageNumber = 1; // 페이지 번호(변수) 초기화 (currentPageNumber 초기화)\n\n  turnPage(); // 페이지 번호(element) 초기화\n\n  putProductsList(currentPageNumber, currentColor); // 색상에 맞는 데이터 불러오기\n\n  toggleHighlightCurrPageNum(); // 현재 페이지 번호 강조 on\n\n  toggleDisplayMoveBtns(); // 만약 현재 페이지가 1페이지면 < 버튼, 마지막 페이지면 > 버튼 삭제\n};\n\nvar onPagination = function onPagination() {\n  toggleDisplayMoveBtns(); // 웹 페이지 최초 접속시에 < , > 버튼 삭제 판별 (1페이지 혹은 마지막 페이지 일때)\n\n  toggleHighlightCurrPageNum(); // 웹 페이지 최초 접속시에 현재 페이지 강조\n\n  putProductsList(currentPageNumber); // 웹페이지 최초 접속시에 데이터 불러오기\n\n  colorsWrap.addEventListener('click', handleColorBtnsClick, false); // 컬러 버튼 클릭시에 그에 맞는 데이터 호출\n\n  pagination.addEventListener('click', handlePaginationBtnsClick, false); // 페이지네이션의 버튼 클릭시에 그에 맞는 데이터 호출\n};\n/* export */\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (onPagination);\n\n//# sourceURL=webpack:///./src/js/client/_onPagination.js?");

/***/ }),

/***/ "./src/js/client/_process.js":
/*!***********************************!*\
  !*** ./src/js/client/_process.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// index.html 파일 기준 이미지 디렉터리 경로\nvar IMG_DIR_PATH = './src/img/'; // 클라이언트 단에서 표시되는 데이터의 형식\n\nvar dataToElement = function dataToElement(dataObj) {\n  if (!Boolean(dataObj)) return '';\n  return \"\\n<li class='app__products__item'>\\n  <section class='app__products__item__image' style='background-image: url(\".concat(IMG_DIR_PATH).concat(dataObj.color, \"_\").concat(dataObj.category[0], \".png);'></section>\\n  <section class='app__products__item__desc'>\\n    <section class='app_products__item__name app_products__item__gender-size'>\").concat(dataObj.gender, \", \").concat(dataObj.size, \"</section>\\n    <section>\").concat(dataObj.color, \" \").concat(dataObj.material, \" \").concat(dataObj.category, \"</section>\\n  </section>\\n</li>\\n\").trim();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (dataToElement);\n\n//# sourceURL=webpack:///./src/js/client/_process.js?");

/***/ }),

/***/ "./src/js/client/client.js":
/*!*********************************!*\
  !*** ./src/js/client/client.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _onPagination_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_onPagination.js */ \"./src/js/client/_onPagination.js\");\n\ndocument.addEventListener('DOMContentLoaded', _onPagination_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"], false);\n\n//# sourceURL=webpack:///./src/js/client/client.js?");

/***/ }),

/***/ "./src/js/fakeServer/_createFakeData.js":
/*!**********************************************!*\
  !*** ./src/js/fakeServer/_createFakeData.js ***!
  \**********************************************/
/*! exports provided: DB, returnData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DB\", function() { return DB; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"returnData\", function() { return returnData; });\n/* harmony import */ var _productsOptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_productsOptions.js */ \"./src/js/fakeServer/_productsOptions.js\");\n/* 상품 옵션을 받아서 랜덤 데이터 생성 */\n// TODO: 특정 버튼을 눌렀을때만 새로운 데이터를 생성하도록 변경하기 (현재는 새로고침 할때마다 데이터가 변경되어버림)\n\nvar NUMBER_OF_PRODUCTS = 100; // 제품 데이터는 100개로 설정\n\nvar createFakeData = function createFakeData(options) {\n  var fakeData = toArray(options).map(function (elem) {\n    var key = elem[0];\n    var randomElem = getRandomElem(elem[1]);\n    return [key, randomElem];\n  });\n  return toObject(fakeData);\n\n  function toArray(obj) {\n    return Object.entries(obj); // object -> array\n  }\n\n  function toObject(array) {\n    return Object.fromEntries(array); // array -> object\n  }\n\n  function getRandomElem(array) {\n    var randomIndex = getRandomNum(array.length);\n    return array[randomIndex]; // 배열에서 랜덤으로 요소 반환\n  }\n\n  function getRandomNum(num) {\n    return parseInt(Math.random() * num); // 0 ~ num-1 의 정수 숫자 한개 반환\n  }\n};\n\nvar DB = [];\n\nfor (var i = 0; i < NUMBER_OF_PRODUCTS; i++) {\n  var data = createFakeData(_productsOptions_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n  DB.push(data);\n}\n\nvar returnData = function returnData() {\n  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n\n  if (!Boolean(color)) {\n    return DB;\n  } else {\n    return DB.filter(function (data) {\n      return data.color === color;\n    });\n  }\n};\n\n\n\n//# sourceURL=webpack:///./src/js/fakeServer/_createFakeData.js?");

/***/ }),

/***/ "./src/js/fakeServer/_productsOptions.js":
/*!***********************************************!*\
  !*** ./src/js/fakeServer/_productsOptions.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// gender - man, female\n// category - t-shirt, pants, skirt\n// size - small, big\n// material - smooth, tough\n// color - blue, yellow, pink\nvar productsOptions = {\n  gender: ['man', 'female'],\n  category: ['t-shirt', 'pants', 'skirt'],\n  size: ['small', 'big'],\n  material: ['smooth', 'tough'],\n  color: ['blue', 'yellow', 'pink']\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (productsOptions);\n\n//# sourceURL=webpack:///./src/js/fakeServer/_productsOptions.js?");

/***/ }),

/***/ "./src/js/fakeServer/fakeServer.js":
/*!*****************************************!*\
  !*** ./src/js/fakeServer/fakeServer.js ***!
  \*****************************************/
/*! exports provided: request, TOTAL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"request\", function() { return reqCurrentPageData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TOTAL\", function() { return TOTAL; });\n/* harmony import */ var _createFakeData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_createFakeData.js */ \"./src/js/fakeServer/_createFakeData.js\");\n/* --------------------------------------------------------------------------------------- */\n\n/* 서버단에서 현재 페이지 넘버에 따라 DB에서 데이터를 가져와서 응답하는 부분을 가정한 구현 */\n\n/* --------------------------------------------------------------------------------------- */\n // 가상 데이터 객체를 DataBase 라고 가정\n\nvar TOTAL = _createFakeData_js__WEBPACK_IMPORTED_MODULE_0__[\"DB\"].length; // 컬러에 따라 가변적\n\nvar reqCurrentPageData = function reqCurrentPageData(currPage, dataNumPerPage) {\n  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  console.log(\"[ page \".concat(currPage, \" ]\")); // test\n\n  var offset = (currPage - 1) * dataNumPerPage; // 표시할 데이터 중 첫번째 데이터의 좌표\n\n  var currentPageData = []; // 현재 좌표에서 시작하여 설정된 숫자만큼의 데이터 가져오기\n\n  var data = Object(_createFakeData_js__WEBPACK_IMPORTED_MODULE_0__[\"returnData\"])(color);\n  TOTAL = data.length;\n\n  for (var i = offset; i < offset + dataNumPerPage; i++) {\n    currentPageData.push(data[i]);\n  }\n\n  return JSON.stringify(currentPageData); // 데이터 json 형식으로 반환\n}; // reqCurrentPageData => 데이터를 가져올 수 있는 함수를 클라이언트에서 쓸 수 있도록 전달\n// TOTAL => 데이터의 총 개수를 클라이언트에서 쓸 수 있도록 전달\n\n\n\n\n//# sourceURL=webpack:///./src/js/fakeServer/fakeServer.js?");

/***/ })

/******/ });