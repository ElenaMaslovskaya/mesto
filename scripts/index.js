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

let popupPhoto = document.querySelector('#photo-popup');
let photoName = document.querySelector('.element__name');
let photoLink = document.querySelector('.elememt__image');
let popupPhotoName = document.querySelector('#photo-name');
let popupPhotoLink = document.querySelector('#link');
let popupPhotoOpenButton = document.querySelector('.profile__add-button');
let popupPhotoCloseButton = document.querySelector('#popup-photo-close');

popupPhotoOpenButton.addEventListener('click', openPhotoForm);
popupPhotoCloseButton.addEventListener('click', closePhotoForm);
popupPhoto.addEventListener('click', closePhotoButtonClick);

function openPhotoForm() {
   popupPhoto.classList.toggle('popup_opened');
}


function closePhotoForm() {
   popupPhoto.classList.toggle('popup_opened');
}

function photoAddHandler(event) {
   event.preventDefault();
   photoName.textContent = popupPhotoName.value;
   photoLink.src = popupPhotoLink.value;
   closePhotoForm(popupPhotoName.value, popupPhotoLink.value);
}

function closePhotoButtonClick(event) {
   if (event.target === event.currentTarget) {
      closePhotoForm();
   }
}
