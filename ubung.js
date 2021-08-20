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
