const popupUser = document.querySelector('#user-popup'); //попап редактирования профиля
const popupPhoto = document.querySelector('#photo-popup'); //попап добавления фотографий
const popupImage = document.querySelector('#image-popup'); //попап просмотра фотографий

const popupOpenBtn = document.querySelector('.profile__edit-button'); //кнопка открытия попапа редактирования профиля
const popupCloseBtn = popupUser.querySelector('.popup__close'); //кнопка закрытия попапа редактирования профиля

const popupPhotoOpenBtn = document.querySelector('.profile__add-button'); //кнопка открытия попапа добавления фотографий
const popupPhotoCloseBtn = popupPhoto.querySelector('popup-close'); //кнопка закрытия попапа добавления фотографий

const popupImageOpenBtn = document.querySelector('.element__image'); //кнопка открытия попапа просмотра фотографий
const popupImageCloseBtn = popupImage.querySelector('popup-close'); //кнопка закрытия попапа просмотра фотографий

const removeBtn = document.querySelectorAll('.element__remove'); //кнопка удаления карточки

const userName = document.querySelector('.profile__username'); //имя пользователя
const userJob = document.querySelector('.profile__userjob'); //информация о пользователе

const popupUserName = document.querySelector('#name'); //поле для ввода имени пользователя
const popupUserJob = document.querySelector('#job'); //поле для ввода информации о пользователе
const photoForm = popupPhoto.querySelector('#photo-form'); //форма добавления фотографий

const saveProfileBtn = popupUser.querySelector('#user-button'); //кнопка сохранения профиля
const savePhotoBtn = popupPhoto.querySelector('#photo-button'); //кнопка сохранения фотографии

const templateCard = document.querySelector('.template-card'); //шаблон карточки
const elements = document.querySelector('.elements'); //контейнер с карточками

const imageFullScreen = popupImage.querySelector('.popup__image'); //фотография для просмотра
const imageCaption = popupImage.querySelector('.popup__caption'); //подпись к фотографии для просмотра

//Шесть карточек «из коробки»

const initialCards = [
   {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
];

addCards(initialCards);

function createCard(item) {
   const newElement = templateCard.content.cloneNode(true); //клонирование элемента

   newElement.querySelector('.element__name').textContent = item.name; //название места из "коробки"
   newElement.querySelector('.element__image').src = item.link; //ссылка из "коробки"
   newElement.querySelector('.element__image').alt = item.name; //описание изображения из "коробки"
   addCardAttribute(newElement);
   return(newElement);

   //elements.append(newElement);
}

//Функция добавления карточек

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
};

function openPopupImage(event) {
   togglePopup(popupImage);
   imageFullScreen.src = event.target.src;
   imageCaption.textContent = event.currentTarget.parentElement.querySelector('.element__name').textContent;
   imageFullScreen.alt = event.currentTarget.parentElement.querySelector('.element__name').textContent;
}

//универсальная функция для открытия/закрытия попапов
function togglePopup(modal) {
   modal.classList.toggle('.popup_opened');
}

popupOpenBtn.addEventListener('click', () => togglePopup(popupUser), userForm());
popupCloseBtn.addEventListener('click', () => togglePopup(popupUser));
popupPhotoOpenBtn.addEventListener('click', () => togglePopup(popupPhoto));
popupPhotoCloseBtn.addEventListener('click', () => togglePopup(popupPhoto));
popupImageCloseBtn.addEventListener('click', () => togglePopup(popupImage));



//функция редактирования профиля
function userForm() {
   popupUserName.value = userName.textContent;
   popupUserJob.value = userJob.textContent;
}

/*
popupOpenButton.addEventListener('click', openForm);
popupCloseButton.addEventListener('click', closeForm);
popupForm.addEventListener('submit', formSubmitHandler);
popup.addEventListener('click', closeButtonClick);

function openForm() {
   popupName.value = userName.textContent;
   popupJob.value = userJob.textContent;
   popup.classList.toggle('popup_opened');
}

function closeForm() {
   popup.classList.toggle('popup_opened');
}

function formSubmitHandler(event) {
   event.preventDefault();
   userName.textContent = popupName.value;
   userJob.textContent = popupJob.value;
   closeForm();
}

function closeButtonClick(event) {
   if (event.target === event.currentTarget) {
      closeForm();
   }
}

function createCard(item) {
   const newElement = templateCard.content.cloneNode(true);

   newElement.querySelector('.element__image').src = item.link;
   newElement.querySelector('.element__name').textContent = item.name;
   newElement.querySelector('.element__like-icon').addEventListener('click', likeElement);
   newElement.querySelector('.element__remove').addEventListener('click', removeElement);

   elements.append(newElement);
}

initialCards.map(createCard);

//Лайк поставить/удалить
function likeElement(evt) {
   evt.target.classList.toggle('element__like-icon_active');
};

//Удаление карточки
function removeElement() {
   const removeButton = document.querySelector('.element__remove');
   const element = removeButton.closest('.element');
   element.remove();
};

let photoName = document.querySelector('.element__name');
let photoLink = document.querySelector('.elememt__image');
let popupPhotoName = document.querySelector('#photo-name');
let popupPhotoLink = document.querySelector('#link');
let popupPhotoForm = document.querySelector('#photo-form');

popupPhotoOpenButton.addEventListener('click', openPhotoForm);
popupPhotoCloseButton.addEventListener('click', closePhotoForm);
popupPhotoForm.addEventListener('submit', formSubmitAdd);
popupPhoto.addEventListener('click', closePhotoButtonClick);

function openPhotoForm() {
   popupPhoto.classList.toggle('popup_opened');
}


function closePhotoForm() {
   popupPhoto.classList.toggle('popup_opened');
}

function closePhotoButtonClick(event) {
   if (event.target === event.currentTarget) {
      closePhotoForm();
   }
}

// функция добавления карточки

function formSubmitAdd(evt) {
   evt.preventDefault();
   const cardTemplate = document.querySelector('.template-card').content;
   const cardElement = cardTemplate.cloneNode(true);
   cardElement.querySelector('.element__image').src = popupPhotoLink.value;
   cardElement.querySelector('.element__name').textContent = popupPhotoName.value;
   elements.prepend(cardElement);
   closePhotoForm();
}
