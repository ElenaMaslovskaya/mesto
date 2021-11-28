import '../pages/index.css';
import {
   Api
} from "../components/Api.js";
import {
   Card
} from "../components/Card.js";
import {
   FormValidator
} from "../components/FormValidator.js";
import {
   Section
} from "../components/Section.js";
import {
   PopupWithImage
} from "../components/PopupWithImage.js";
import {
   PopupWithForm
} from "../components/PopupWithForm.js";
import {
   PopupWithSubmit
} from "../components/PopupWithSubmit.js";
import {
   UserInfo
} from "../components/UserInfo.js";
import {
   popupUser,
   popupPhoto,
   popupImage,
   popupAvatar,
   popupDelete,
   popupOpenBtn,
   popupAvatarOpenBtn,
   popupPhotoOpenBtn,
   popupDeleteOpenBtn,
   userName,
   userJob,
   avatar,
   popupUserName,
   popupUserJob,
   popupAvatarInput,
   elements,
   photoForm,
   profileForm,
   avatarForm,
   //newElmentName,
   //newElementLink,
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
   .catch((err) => {
      console.log(`Ошибка: ${err}`);
   })

//добавление карточек
const addCards = new Section({
   renderer: (item) => {
      const element = createCard(item);
      addCards.addItem(element);
   }
}, elements);

//отображение информации о пользователе на странице
const userInfoProfile = new UserInfo({
   userSelector: userName,
   infoSelector: userJob,
   avatarSelector: avatar,
});

//экзкмпляр PopupWithForm для редактирования профиля
const profilePopupWithForm = new PopupWithForm({
   popupSelector: popupUser,
   handleFormSubmit: (data) => {
      profilePopupWithForm.renderLoading(true);
      api.updateUserInfo({
            name: data.name,
            about: data.about
         })
         .then((data) => {
            userInfoProfile.setUserInfo(data);
            profilePopupWithForm.close();
         })
         .catch((err) => {
            console.log(`Ошибка: ${err}`);
         })
         .finally(() => {
            profilePopupWithForm.renderLoading(false)
         })
   }
});

profilePopupWithForm.setEventListeners();

//открытие попапа редактирования профиля
const popupUserEdit = () => {
   const data = userInfoProfile.getUserInfo();
   popupUserName.value = data.name;
   popupUserJob.value = data.about;

   popupUserValidator.resetValidation();
   profilePopupWithForm.open();
}

popupOpenBtn.addEventListener('click', popupUserEdit);

const avatarPopupWithForm = new PopupWithForm({
   popupSelector: popupAvatar,
   handleFormSubmit: (data) => {
      avatarPopupWithForm.renderLoading(true);
      api.updateAvatar({
            avatar: data.avatar
         })
         .then((data) => {
            userInfoProfile.setUserAvatar(data);
         })
         .then(() => {
            avatarPopupWithForm.close()
         })
         .catch((err) => {
            console.log(`Ошибка: ${err}`);
         })
         .finally(() => {
            avatarPopupWithForm.renderLoading(false)
         })
   }
})

avatarPopupWithForm.setEventListeners();

// Открытие попапа редактирования аватара
const popupAvatarOpen = () => {
   popupAvatarValidator.resetValidation();
   avatarPopupWithForm.open();
}

popupAvatarOpenBtn.addEventListener('click', popupAvatarOpen);

//экзкмпляр PopupWithImage для для просмотра фотографий
const popupWithImageOpen = new PopupWithImage(popupImage);
popupWithImageOpen.setEventListeners();

const popupPhotoDelete = new PopupWithSubmit(popupDelete)
popupPhotoDelete.setEventListeners();

//создание карточки 
const createCard = (data) => {
   const card = new Card({
      data,
      userId,
      handleCardClick: (name, link) => {
         popupWithImageOpen.open(name, link)
      },
      handleRemoveCard: (cardId) => {
         popupPhotoDelete.open();
         popupPhotoDelete.setSubmitActions(() => {
            popupPhotoDelete.renderLoading(true);
            api.deleteCard(cardId)
               .then((res) => {
                  popupPhotoDelete.close()
                  card.deleteCard(res)
               })
               .catch((err) => {
                  console.log(`Ошибка: ${err}`);
               })
               .finally(() => {
                  popupPhotoDelete.renderLoading(false);
               })
         })
      },
      handleLikeClick: (cardId) => {
         api.likeCard(cardId)
            .then((res) => {
               card.like(res);
            })
            .catch((err) => {
               console.log(`Ошибка: ${err}`);
            })
      },
      handleLikeDelete: (cardId) => {
         api.dislikeCard(cardId)
            .then((res) => {
               card.like(res);
            })
            .catch((err) => {
               console.log(`Ошибка: ${err}`);
            })
      },
   }, ".template-card"); // создадим экземпляр карточки
   const cardElement = card.generateCard();
   return cardElement
}

//экзкмпляр PopupWithForm для для добавления карточек
const photoPopupWithForm = new PopupWithForm({
   popupSelector: popupPhoto,
   handleFormSubmit: (data) => {
      photoPopupWithForm.renderLoading(true);
      api.addNewCard({
            name: data.title,
            link: data.link
         })
         .then((data) => {
            const element = createCard(data)
            addCards.addNewItem(element);
         })
         .then(() => {
            photoPopupWithForm.close();
         })
         .catch((err) => {
            console.log(`Ошибка: ${err}`);
         })
         .finally(() => {
            photoPopupWithForm.renderLoading(false)
         })
   }
})

photoPopupWithForm.setEventListeners();

//открытие попапа добавления карточек
const popupPhotoOpen = () => {
   popupPhotoValidator.resetValidation();
   photoPopupWithForm.open();
}

popupPhotoOpenBtn.addEventListener('click', popupPhotoOpen);

//валидация формы редактирования профиля
const popupUserValidator = new FormValidator(config, profileForm);
popupUserValidator.enableValidation();

//валидация формы добавления фото
const popupPhotoValidator = new FormValidator(config, photoForm);
popupPhotoValidator.enableValidation();

//валидация формы редактирования аватара
const popupAvatarValidator = new FormValidator(config, avatarForm);
popupAvatarValidator.enableValidation();