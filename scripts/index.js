const popupUser = document.querySelector('#user-popup'); //попап редактирования профиля
const popupPhoto = document.querySelector('#photo-popup'); //попап добавления фотографий
const popupImage = document.querySelector('#image-popup'); //попап просмотра фотографий

const popupOpenBtn = document.querySelector('.profile__edit-button'); //кнопка открытия попапа редактирования профиля
const popupCloseBtn = popupUser.querySelector('.popup__close'); //кнопка закрытия попапа редактирования профиля

const popupPhotoOpenBtn = document.querySelector('.profile__add-button'); //кнопка открытия попапа добавления фотографий
const popupPhotoCloseBtn = popupPhoto.querySelector('.popup__close'); //кнопка закрытия попапа добавления фотографий

const popupImageCloseBtn = popupImage.querySelector('.popup__close'); //кнопка закрытия попапа просмотра фотографий

const userName = document.querySelector('.profile__username'); //имя пользователя
const userJob = document.querySelector('.profile__userjob'); //информация о пользователе

const photoForm = popupPhoto.querySelector('#photo-form'); //форма добавления фотографий

const popupUserName = document.querySelector('#name'); //поле для ввода имени пользователя
const popupUserJob = document.querySelector('#job'); //поле для ввода информации о пользователе
const newElmentName = photoForm.querySelector('#photo-name'); //поле для ввода названия фотографии
const newElementLink = photoForm.querySelector('#link'); //поле для ввода ссылки на фотографию

const savePhotoBtn = popupPhoto.querySelector('#photo-button'); //кнопка сохранения фотографии

const templateCard = document.querySelector('.template-card'); //шаблон карточки
const elements = document.querySelector('.elements'); //контейнер с карточками

const imageFullScreen = popupImage.querySelector('.popup__image'); //фотография для просмотра
const imageCaption = popupImage.querySelector('.popup__caption'); //подпись к фотографии для просмотра

//Шесть карточек «из коробки»

const initialCards = [
   {
      name: 'Мюнхен',
      link: 'https://images.unsplash.com/photo-1595867818082-083862f3d630?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'
   },
   {
      name: 'Берлин',
      link: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80'
   },
   {
      name: 'Штуттгарт',
      link: 'https://images.unsplash.com/photo-1617728035926-9768d5ed60e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'
   },
   {
      name: 'Кёльн',
      link: 'https://images.unsplash.com/photo-1578308148355-6e1b5300f134?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80'
   },
   {
      name: 'Гамбург',
      link: 'https://images.unsplash.com/photo-1473615695634-d284ec918736?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'
   },
   {
      name: 'Дрезден',
      link: 'https://images.unsplash.com/photo-1619120810930-6ca5048deee1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1031&q=80'
   }
];

addCards(initialCards);

function createCard(item) {
   const newElement = templateCard.content.cloneNode(true); //клонирование элемента

   newElement.querySelector('.element__name').textContent = item.name; //название места из "коробки"
   newElement.querySelector('.element__image').src = item.link; //ссылка из "коробки"
   newElement.querySelector('.element__image').alt = item.name; //описание изображения из "коробки"
   addCardAttribute(newElement);
   return (newElement);
}

function addElement(event) {
   event.preventDefault();
   const newElement = createCard({ name: newElmentName.value, link: newElementLink.value });
   elements.prepend(newElement);
   event.currentTarget.reset();
   closePopup(popupPhoto);
   savePhotoBtn.setAttribute("disabled", "disabled");
   savePhotoBtn.classList.add('popup__button_disabled');
}

photoForm.addEventListener('submit', addElement);

function addCards(cards) {
   const newCards = cards.map(createCard);
   elements.prepend(...newCards);
}

function addCardAttribute(card) {
   card.querySelector('.element__remove').addEventListener('click', removeElement);
   card.querySelector('.element__like-icon').addEventListener('click', likeElement);
   card.querySelector('.element__image').addEventListener('click', openPopupImage);
}

//функция удаления карточки
function removeElement(event) {
   const card = event.target.closest('.element');
   card.remove();
}

//Лайк поставить/удалить
function likeElement(event) {
   event.target.classList.toggle('element__like-icon_active');
}

function openPopupImage(event) {
   openPopup(popupImage);
   imageFullScreen.src = event.target.src;
   imageCaption.textContent = event.currentTarget.alt;
   imageFullScreen.alt = event.currentTarget.alt;
}

popupOpenBtn.addEventListener('click', () => openPopup(popupUser), userForm());
popupCloseBtn.addEventListener('click', () => closePopup(popupUser));
popupPhotoOpenBtn.addEventListener('click', () => openPopup(popupPhoto));
popupPhotoCloseBtn.addEventListener('click', () => closePopup(popupPhoto));
popupImageCloseBtn.addEventListener('click', () => closePopup(popupImage));

//универсальная функция для открытия попапов
function openPopup(popup) {
   popup.classList.add('popup_opened');
   document.addEventListener('keydown', escapeClosePopup);
}

//универсальная функция для закрытия попапов
function closePopup(popup) {
   popup.classList.remove('popup_opened');
   document.removeEventListener('keydown', escapeClosePopup);
}

//функция редактирования профиля
function userForm() {
   popupUserName.value = userName.textContent;
   popupUserJob.value = userJob.textContent;
}


//Функуия добавления информации в профиль и закрытие попапа
function formSubmitHandler(event) {
   event.preventDefault();
   userName.textContent = popupUserName.value;
   userJob.textContent = popupUserJob.value;
   closePopup(popupUser);
}

popupUser.addEventListener('submit', formSubmitHandler);

//закрытие попапов кликом на оверлей
function overlayClosePopup(event) {
   if (event.target === event.currentTarget) {
      closePopup(event.target);
   }
}

popupUser.addEventListener('click', overlayClosePopup);
popupPhoto.addEventListener('click', overlayClosePopup);
popupImage.addEventListener('click', overlayClosePopup);

//закрытие попапов нажатием на клавишу Esc
function escapeClosePopup(event) {
   if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) {
      closePopup(openedPopup);
      }
   }
}






