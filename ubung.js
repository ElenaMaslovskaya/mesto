const usersCards = document.querySelector('.elements');

function addCardsElement(inputTitleCard, inputLinkCard) {
   //Шаблон template
   const cardTemplate = document.querySelector('.elements__card').content;

   //Клонирование содержимого в template
   const userElement = userTemplate.querySelector('.element').cloneNode(tru

   //наполняем содержимым
   userElement.querySelector('.element__name').textContent = inputTitleCard
   userElement.querySelector('.element__image').src = inputLinkCard;

   //Отображаем на странице
   userCards.prepend(userElement);
};

//Добавление в форму название и ссылку фотографии
const titleCard = document.querySelector('.element__name');
const linkCard = document.querySelector('.element__image');

function photoAddHandler(evt){
   evt.preventDefault();
   titleCard.textContent = inputTitleCard.value;
   linkCard.src = inputLinkCard.value;
   addCardsElement(inputTitleCard.value, inputLinkCard.value);
};

//Лайк поставить/удалить
const elementLike = document.querySelector('.element__like-icon');
elementLike.addEventListener('click', function (evt) {
   evt.target.classList.toggle('element__like-icon_active');
});

const cards = document.querySelector('.places__cards'); // находим список карточек
initialCards.forEach((item) => { // обход массива, в функции параметр item - каждый элемент массива
  const cardTemplate = document.querySelector('.card-template').content; // находим шаблон карточки
  const cardElement = cardTemplate.cloneNode(true); // клонируем шаблон карточки, параметр true говорит, что мы клонируем вместе с содержимым
  cardElement.querySelector('.card__image').src = item.link; // в img (находим по классу) вставляем в атрибут src значение ключа link
  cardElement.querySelector('.card__title').textContent = item.name; // наполняем заголовок h2 (находим по классу) берем значение из ключа name
  cards.append(cardElement); // добавляем получившийся узел в конец cards
});
function formSubmitAdd(evt) { // функция добавления карточки
  evt.preventDefault();
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = placeLinkInput.value;
  cardElement.querySelector('.card__title').textContent = placeNameInput.value;
  cards.prepend(cardElement);
  closePopup(popupAdd);
}