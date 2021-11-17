import { Card } from "../components/Card.js";
import { initialCards } from "../utils/cards.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
   popupUser,
   popupPhoto,
   popupImage,
   popupOpenBtn,
   popupPhotoOpenBtn,
   userName,
   userJob,
   popupUserName,
   popupUserJob,
   elements,
   photoForm,
   profileForm,
   newElmentName,
   newElementLink,
   config
} from "../utils/constants.js";

//валидация формы редактирования профиля
const popupUserValidator = new FormValidator(config, profileForm);
popupUserValidator.enableValidation();

//валидация формы добавления фото
const popupPhotoValidator = new FormValidator(config, photoForm);
popupPhotoValidator.enableValidation();


//отображение информации о пользователе на странице
const userInfoProfile = new UserInfo({
   userSelector: userName,
   infoSelector: userJob
});

//экзкмпляр PopupWithForm для редактирования профиля
const profilePopupWithForm = new PopupWithForm({
   popupSelector: popupUser,
   handleFormSubmit: () => {
      userInfoProfile.setUserInfo(popupUserName.value, popupUserJob.value);
      profilePopupWithForm.close();
   }
});

profilePopupWithForm.setEventListeners();

//открытие попапа редактирования профиля
const popupUserEdit = () => {
   const data = userInfoProfile.getUserInfo();
   popupUserName.value = data.nameInfo;
   popupUserJob.value = data.jobInfo;

   popupUserValidator.resetValidation();
   profilePopupWithForm.open();
}

popupOpenBtn.addEventListener('click', popupUserEdit);

//экзкмпляр PopupWithImage для для просмотра фотографий
const popupWithImageOpen = new PopupWithImage(popupImage);
popupWithImageOpen.setEventListeners();

//создание карточки 
const addNewCard = (item) => {
   const card = new Card({
      data: item,
      handleCardClick: () => {
         popupWithImageOpen.open(item)
      },
   }, ".template-card"); // создадим экземпляр карточки
   const cardElement = card.generateCard();
   return cardElement;
};

//добавление карточек
const addCards = new Section({
   items: initialCards,
   renderer: (item) => {
      const element = addNewCard(item);
      addCards.addItem(element);
   }
}, elements);

addCards.renderItems();

//экзкмпляр PopupWithForm для для добавления карточек
const photoPopupWithForm = new PopupWithForm({
   popupSelector: popupPhoto,
   handleFormSubmit: () => {
      const item = {
         name: newElmentName.value,
         link: newElementLink.value
      };
      const newCard = addNewCard(item);
      addCards.addNewItem(newCard);
      photoPopupWithForm.close();
   }
})

photoPopupWithForm.setEventListeners();

//открытие попапа добавления карточек
const popupPhotoOpen = () => {
   popupPhotoValidator.resetValidation();
   photoPopupWithForm.open();
}

popupPhotoOpenBtn.addEventListener('click', popupPhotoOpen);
