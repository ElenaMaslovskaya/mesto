const popupUser = document.querySelector('#user-popup'); //попап редактирования профиля
const popupPhoto = document.querySelector('#photo-popup'); //попап добавления фотографий
const popupImage = document.querySelector('#image-popup'); //попап просмотра фотографий

const popupOpenBtn = document.querySelector('.profile__edit-button'); //кнопка открытия попапа редактирования профиля
const popupCloseBtn = popupUser.querySelector('.popup__close'); //кнопка закрытия попапа редактирования профиля

const popupPhotoOpenBtn = document.querySelector('.profile__add-button'); //кнопка открытия попапа добавления фотографий
const popupPhotoCloseBtn = popupPhoto.querySelector('popup__close'); //кнопка закрытия попапа добавления фотографий

const popupImageOpenBtn = document.querySelector('.element__image'); //кнопка открытия попапа просмотра фотографий
const popupImageCloseBtn = popupImage.querySelector('popup__close'); //кнопка закрытия попапа просмотра фотографий

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
   return (newElement);

   //elements.append(newElement);
}

function addElement(event) {
   event.preventDefault();
   const newElmentName = event.currentTarget.querySelector('#photo-name').value;
   const newElementLink = event.currentTarget.querySelector('#link').value;
   const newElement = createCard({ name: newElmentName, link: newElementLink });
   elements.prepend(newElement);
   event.currentTarget.reset();
   togglePopup(popupPhoto);
}

contentForm.addEventListener('submit', addElement);

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

popupOpenBtn.addEventListener('click', () => togglePopup(popupUser), userForm());
popupCloseBtn.addEventListener('click', () => togglePopup(popupUser));
popupPhotoOpenBtn.addEventListener('click', () => togglePopup(popupPhoto));
popupPhotoCloseBtn.addEventListener('click', () => togglePopup(popupPhoto));
popupImageCloseBtn.addEventListener('click', () => togglePopup(popupImage));

//универсальная функция для открытия/закрытия попапов
function togglePopup(modal) {
   modal.classList.toggle('.popup_opened');
}

//функция редактирования профиля
function userForm() {
   popupUserName.value = userName.textContent;
   popupUserJob.value = userJob.textContent;
}

function formSubmitHandler(event) {
   event.preventDefault();
   userName.textContent = popupUserName.value;
   userJob.textContent = popupUserJob.value;
   togglePopup(popupUser);
}

popupUser.addEventListener('submit', formSubmitHandler);
