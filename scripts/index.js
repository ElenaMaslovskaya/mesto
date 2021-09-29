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

const elements = document.querySelector('.elements');
const templateCard = document.querySelector('.template-card');

/*
initialCards.forEach((item) => {
   const templateCard = document.querySelector('.template-card').content;
   const newElement = templateCard.cloneNode(true);

   newElement.querySelector('.element__image').src = item.link;
   newElement.querySelector('.element__name').textContent = item.name;

   elements.append(newElement);
});
*/

function createCard(item) {
   const newElement = templateCard.content.cloneNode(true);

   newElement.querySelector('.element__image').src = item.link;
   newElement.querySelector('.element__name').textContent = item.name;

   //Лайк поставить/удалить
   newElement.querySelector('.element__like-icon').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like-icon_active');
   });

   elements.append(newElement);

}

initialCards.map(createCard);

let popupPhoto = document.querySelector('#photo-popup');
let photoName = document.querySelector('.element__name');
let photoLink = document.querySelector('.elememt__image');
let popupPhotoName = document.querySelector('#photo-name');
let popupPhotoLink = document.querySelector('#link');
let popupPhotoOpenButton = document.querySelector('.profile__add-button');
let popupPhotoCloseButton = document.querySelector
('#popup-photo-close');
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

function formSubmitAdd(evt) { // функция добавления карточки
   evt.preventDefault();
   const cardTemplate = document.querySelector('.template-card').content;
   const cardElement = cardTemplate.cloneNode(true);
   cardElement.querySelector('.element__image').src = popupPhotoLink.value;
   cardElement.querySelector('.element__name').textContent = popupPhotoName.value;
   elements.prepend(cardElement);
   closePhotoForm();
}
