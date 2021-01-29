import onPagination from './_onPagination.js';
import onProductsClickEvent from './_onProductsClickEvent.js';

const startApp = () => {
  onPagination();
  onProductsClickEvent();
};

document.addEventListener('DOMContentLoaded', startApp, false);
