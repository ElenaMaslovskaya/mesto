import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";

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
const profileForm = popupUser.querySelector('#user-form');//форма редактирования профиля

const popupUserName = document.querySelector('#name'); //поле для ввода имени пользователя
const popupUserJob = document.querySelector('#job'); //поле для ввода информации о пользователе
//const newElmentName = photoForm.querySelector('#photo-name'); //поле для ввода названия фотографии
//const newElementLink = photoForm.querySelector('#link'); //поле для ввода ссылки на фотографию

//const savePhotoBtn = popupPhoto.querySelector('#photo-button'); //кнопка сохранения фотографии

//const templateCard = document.querySelector('.template-card'); //шаблон карточки
const elements = document.querySelector('.elements'); //контейнер с карточками

//const imageFullScreen = popupImage.querySelector('.popup__image'); //фотография для просмотра
//const imageCaption = popupImage.querySelector('.popup__caption'); //подпись к фотографии для просмотра

const config = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_error',
   errorClass: 'error'
};

//валидация формы добавления фото
const formAddImg = new FormValidator(config, photoForm);
formAddImg.enableValidation();

//валидация формы редактирования профиля
const formEditProfile = new FormValidator(config, profileForm);
formEditProfile.enableValidation();

// Создание карточки 
function addNewCard(item) {
   const card = new Card(item, ".template-card"); // создадим экземпляр карточки
   const cardElement = card._generateCard();
   return cardElement;
};

// Добавление карточек
function addCards(item) {
   const cardElement = addNewCard(item);
   elements.prepend(cardElement);
};

//Загрузка массива карточек на страницу
initialCards.forEach((item) => {
   elements.append(addNewCard(item));
});

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

//Функция дабавления информации из формы на страницу 
function addElements(event) {
   event.preventDefault(); // чтоб страница не перезагружалась при отправке формы
   const newCardText = event.currentTarget.querySelector("#photo-name").value; // задаем название карточки 
   const newCardLink = event.currentTarget.querySelector("#link").value; // задаем ссылку на карточку
   const newCards = { name: newCardText, link: newCardLink };

   const elementCard = addNewCard(newCards);
   elements.prepend(elementCard); // добавляем элемент на страницу
   event.currentTarget.reset(); // чтоб в полях не сохранялись введенные данные  
   closePopup(popupPhoto); //  чтоб автоматом закрывался popup после нажатия на "Создать"
}

photoForm.addEventListener("submit", addElements);

popupOpenBtn.addEventListener('click', () => openPopup(popupUser), userForm());
popupCloseBtn.addEventListener('click', () => closePopup(popupUser));
popupPhotoOpenBtn.addEventListener('click', () => openPopup(popupPhoto));
popupPhotoCloseBtn.addEventListener('click', () => closePopup(popupPhoto));
popupImageCloseBtn.addEventListener('click', () => closePopup(popupImage));


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

export { openPopup, popupImage };





