import { openPopup, popupImage } from './index.js';

class Card {
   constructor(data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
   }

   _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

      return cardElement;
   }

   _generateCard() {
      this._element = this._getTemplate();

      this._elementName = this._element.querySelector('.element__name');
      this._elementImg = this._element.querySelector('.element__image');
      this._setEventListeners();

      this._elementImg.src = this._link;
      this._elementName.textContent = this._name;
      this._elementImg.alt = this._name;

      return this._element;
   }

   _setEventListeners() {
      this._element.querySelector('.element__remove').addEventListener('click', () => {
         this._removeElement();
      });

      this._element.querySelector('.element__like-icon').addEventListener('click', () => {
         this._likeElement();
      });

      this._element.querySelector('.element__image').addEventListener('click', () => {
         this._openPopupImage();
      });
   }

   //функция удаления карточки
   _removeElement() {
      this._element.remove();
      this._element.innerHTML = "";
   }

   //Лайк поставить/удалить
   _likeElement() {
      this._element.querySelector('.element__like-icon').classList.toggle('element__like-icon_active');
   }

   //функция открытия попапа с картинкой
   _openPopupImage() {
      openPopup(popupImage);
      const imageFullScreen = popupImage.querySelector('.popup__image');
      const imageCaption = popupImage.querySelector('.popup__caption');
      imageFullScreen.src = this._link;
      imageCaption.textContent = this._name;
      imageFullScreen.alt = this._name;
   }
}

export { Card };