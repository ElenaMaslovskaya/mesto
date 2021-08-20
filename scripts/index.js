let userName = document.querySelector('.profile__username');
let userJob = document.querySelector('.profile__userjob');
let popup = document.querySelector('#user-popup');
let popupCloseButton = popup.querySelector('.popup__close');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupForm = document.querySelector('.popup__form');
let popupName = document.querySelector('#name');
let popupJob = document.querySelector('#job');

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

let photoName = document.querySelector('.element__name');
let photoLink = document.querySelector('.element__image');
let popupPhoto = document.querySelector('#photo-popup');
let popupPhotoOpenButton = document.querySelector('.profile__add-button');
let popupPhotoCloseButton = document.querySelector('.popup__close');
let popupPhotoForm = document.querySelector('.popup__form');
let popupPhotoName = document.querySelector('#photo-name');
let popupPhotoLink = document.querySelector('#link');

popupPhotoOpenButton.addEventListener('click', openPhotoForm);
popupPhotoCloseButton.addEventListener('click', closePhotoForm);
popupPhotoForm.addEventListener('submit', formPhotoSubmitHandler);
popupPhoto.addEventListener('click', closePhotoButtonClick);

function openPhotoForm() {
   popupPhotoName.value = photoName.textContent;
   popupPhotoLink.value = photoLink.textContent;
   popupPhoto.classList.toggle('popup_opened');
}

function closePhotoForm() {
   popupPhoto.classList.toggle('popup_opened');
}

function formSubmitHandler(event) {
   event.preventDefault();
   photoName.textContent = popupPhotoName.value;
   photoLink.textContent = popupPhotoLink.value;
   closePhotoForm();
}

function closePhotoButtonClick(event) {
   if (event.target === event.currentTarget) {
      closePhotoForm();
   }
}
