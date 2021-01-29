{
  // expected element
  /* 
<article class="modal">
  <section class="modal__image-wrap">
    <article class="modal__image" style="background-image: url(~);"></article>
  </section>
  <ul class="modal__infos">
    <li class="modal__info"><p class="modal__info__text modal__info__text--name">${name}</p></li>
    <li class="modal__info"><p class="modal__info__text">gender: ${gender}</p></li>
    <li class="modal__info"><p class="modal__info__text">size: ${size}</p></li>
  </ul>
  <section class="modal__close-btn-wrap">
    <button class="modal__close-btn">close</button>
  </section>
</article>
  */
}

const handleModalCloseBtnClick = () => {
  const modal = document.querySelector('.modal');

  modal?.remove();
};

const createProductsDetailModal = (imageUrl, name, gender, size) => {
  const app = document.querySelector('.app');

  if (app.lastChild.className === 'modal') return; // 이미 모달이 있다면 return

  const modal = document.createElement('article');
  modal.classList.add('modal');

  console.log(imageUrl);

  modal.innerHTML = `
<section class="modal__image-wrap">
  <article class="modal__image" style="background-image: url(${imageUrl});"></article>
</section>
<ul class="modal__infos">
  <li class="modal__info"><p class="modal__info__text modal__info__text--name">${name}</p></li>
  <li class="modal__info"><p class="modal__info__text">gender: ${gender}</p></li>
  <li class="modal__info"><p class="modal__info__text">size: ${size}</p></li>
</ul>
<section class="modal__close-btn-wrap">
  <button class="modal__close-btn">close</button>
</section>
`.trim();

  app.append(modal);

  app
    .querySelector('.modal__close-btn')
    ?.addEventListener('click', handleModalCloseBtnClick, false);
};

const handleClick = (e) => {
  if (e.target.tagName === 'UL') return; // 클릭된게 상품이 아닌 부모 wrapper라면 return

  const item = e.target.closest('li');

  const imageUrl = item
    .querySelector('.app__products__item__image')
    .style.backgroundImage.match(/(?<=url\(").*(?="\))/)[0];
  const name = item.querySelector('.app__products__item__name').textContent;
  const [_, gender, size] = item
    .querySelector('.app__products__item__gender-size')
    .textContent.match(/([a-z]+), ([a-z]+)/);

  createProductsDetailModal(imageUrl, name, gender, size);
};

const onProductsClickEvent = () => {
  const itemList = document.querySelector('.app__products__list');

  itemList?.addEventListener('click', handleClick, false);
};

export default onProductsClickEvent;
