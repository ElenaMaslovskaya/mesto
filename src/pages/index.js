import '../pages/index.css';
import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
//import { PopupWithSubmit } from "../components/PopupWithSubmit.js";
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

//экземпляр класса для отправки запросов
const api = new Api({
   baseUrl: "https://nomoreparties.co/v1/cohort-30",
   headers: {
      authorization: "eb8cafe8-806f-4128-87f6-a89a8c96159b",
      "Content-Type": "application/json",
   },
});

let userId = null;

Promise.all([api.getInitialCards(), api.getUserInfo()])
   .then(([cards, user]) => {
      userId = user._id;
      userInfoProfile.setUserInfo(user);
      addCards.renderItems(cards);
   
   console.log('Данные карточек', cards);
   console.log('Данные пользователя', user);
   })

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
const createCard = (item) => {
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
   renderer: (item) => {
      const element = createCard(item);
      addCards.addItem(element);
   }
}, elements);

//экзкмпляр PopupWithForm для для добавления карточек
const photoPopupWithForm = new PopupWithForm({
   popupSelector: popupPhoto,
   handleFormSubmit: () => {
      const item = {
         name: newElmentName.value,
         link: newElementLink.value
      };
      const newCard = createCard(item);
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
