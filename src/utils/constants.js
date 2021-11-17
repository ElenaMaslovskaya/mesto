export const popupUser = document.querySelector('#user-popup'); //попап редактирования профиля
export const popupPhoto = document.querySelector('#photo-popup'); //попап добавления фотографий
export const popupImage = document.querySelector('#image-popup'); //попап просмотра фотографий

export const popupOpenBtn = document.querySelector('.profile__edit-button'); //кнопка открытия попапа редактирования профиля
export const popupPhotoOpenBtn = document.querySelector('.profile__add-button'); //кнопка закрытия попапа редактирования профиля

export const userName = document.querySelector('.profile__username'); //имя пользователя
export const userJob = document.querySelector('.profile__userjob'); //информация о пользователе

export const photoForm = popupPhoto.querySelector('#photo-form'); //форма добавления фотографий
export const profileForm = popupUser.querySelector('#user-form');//форма редактирования профиля

export const popupUserName = document.querySelector('#name'); //поле для ввода имени пользователя
export const popupUserJob = document.querySelector('#job'); //поле для ввода информации о пользователе

 export const newElmentName = photoForm.querySelector('#photo-name'); //поле для ввода названия фотографии
 export const newElementLink = photoForm.querySelector('#link'); //поле для ввода ссылки на фотографию

export const elements = document.querySelector('.elements'); //контейнер с карточками

export const config = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_error',
   errorClass: 'error'
};