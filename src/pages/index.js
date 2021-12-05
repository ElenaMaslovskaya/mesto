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
   //popupDeleteOpenBtn,
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
      "Content-Type": "application/json",
      authorization: "eb8cafe8-806f-4128-87f6-a89a8c96159b",
   }
})

//....Работа с карточками....//

//добавление карточек
const addCards = new Section({
   renderer: (item) => {
      const element = createCard(item)
      addCards.addItem(element)
   }
}, elements);

//экзкмпляр PopupWithImage для для просмотра фотографий
const openPopupWithImage = new PopupWithImage(popupImage);
openPopupWithImage.setEventListeners();

//экземпляр PopupWithSubmit для удаления фотографий
const popupPhotoDelete = new PopupWithSubmit(popupDelete)
popupPhotoDelete.setEventListeners();

//создание карточки
const createCard = (data) => {
   const card = new Card({
      data,
      userId,
      handleCardClick: (name, link) => {
         openPopupWithImage.open(name, link)
      },
      handleRemoveCard: (cardId) => {
         popupPhotoDelete.open();
         popupPhotoDelete.setSubmitActions(() => {
            popupPhotoDelete.renderLoading(true);
            api.deleteCard(cardId)
               .then((res) => {
                  popupPhotoDelete.close()
                  card.removeElement(res)
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
         api.addLike(cardId)
            .then((res) => {
               card.like(res);
            })
            .catch((err) => {
               console.log(`Ошибка: ${err}`);
            })
      },
      handleRemoveLike: (cardId) => {
         api.removeLike(cardId)
            .then((res) => {
               card.like(res);
            })
            .catch((err) => {
               console.log(`Ошибка: ${err}`);
            })
      },
   }, ".template-card"); // создадим экземпляр карточки

   const cardElement = card.generateCard();
   return cardElement;
}

//экзкмпляр PopupWithForm для для добавления карточек
const photoPopupWithForm = new PopupWithForm({
   popupElement: popupPhoto,
   handleFormSubmit: (data) => {
      photoPopupWithForm.renderLoading(true);
      api.addNewCard(data)
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
const openPopupPhoto = () => {
   popupPhotoValidator.resetValidation();
   photoPopupWithForm.open();
}

popupPhotoOpenBtn.addEventListener('click', openPopupPhoto);

//....Работа с аватаром....//

const avatarPopupWithForm = new PopupWithForm({
   popupElement: popupAvatar,
   handleFormSubmit: (data) => {
      avatarPopupWithForm.renderLoading(true);
      api.updateAvatar(data)
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
const openPopupAvatar = () => {
   popupAvatarValidator.resetValidation();
   avatarPopupWithForm.open();
}

popupAvatarOpenBtn.addEventListener('click', openPopupAvatar);

//....Работа с профилем пользователя....//

//отображение информации о пользователе на странице
const userInfoProfile = new UserInfo({
   userElement: userName,
   infoElement: userJob,
   avatarElement: avatar
});

//экзкмпляр PopupWithForm для редактирования профиля
const profilePopupWithForm = new PopupWithForm({
   popupElement: popupUser,
   handleFormSubmit: (data) => {
      profilePopupWithForm.renderLoading(true);
      api.updateUserInfo({
            name: data.name,
            about: data.job,
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
const editPopupUser = () => {
   const getUserInfo = userInfoProfile.getUserInfo();
   popupUserName.value = getUserInfo.name;
   popupUserJob.value = getUserInfo.about;

   popupUserValidator.resetValidation();
   profilePopupWithForm.open();
}

popupOpenBtn.addEventListener('click', editPopupUser);

//....Валидация форм....//

//валидация формы редактирования профиля
const popupUserValidator = new FormValidator(config, profileForm);
popupUserValidator.enableValidation();

//валидация формы добавления фото
const popupPhotoValidator = new FormValidator(config, photoForm);
popupPhotoValidator.enableValidation();

//валидация формы редактирования аватара
const popupAvatarValidator = new FormValidator(config, avatarForm);
popupAvatarValidator.enableValidation();

//Получить данные с сервера

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
   .then(([user, cards]) => {
      userId = user._id;
      userInfoProfile.setUserInfo(user);
      userInfoProfile.setUserAvatar(user);

      addCards.renderItems(cards);
   })
   .catch((err) => {
      console.log(`Ошибка: ${err}`);
   })