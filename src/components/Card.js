export class Card {
   constructor({
      data,
      userId,
      handleCardClick,
      handleLikeClick,
      handleRemoveCard,
      handleRemoveLike
   }, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._ownerId = data.owner._id;
      this._cardId = data._id;
      this._userId = userId;
      this._handleCardClick = handleCardClick;
      this._handleLikeClick = handleLikeClick;
      this._handleRemoveCard = handleRemoveCard;
      this._handleRemoveLike = handleRemoveLike;
      this._cardSelector = cardSelector;
   }

   _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

      return cardElement;
   }

   generateCard() {
      this._element = this._getTemplate();

      this._elementName = this._element.querySelector('.element__name');
      this._elementImg = this._element.querySelector('.element__image');
      this._deleteButton = this._element.querySelector('.element__remove');
      this._likeButton = this._element.querySelector('.element__like-icon');
      this._likesCounter = this._element.querySelector(".element__likes-counter");

      this._setEventListeners();

      this._elementName.textContent = this._name;
      this._elementImg.src = this._link;
      this._elementImg.alt = this._name;
      this._likesCounter.textContent = this._likes.length;
      this._checkRemoveCard();
      this._checkActiveLike();

      return this._element;
   }

   _setEventListeners() {
      this._deleteButton.addEventListener('click', () => {
         this._handleRemoveCard(this._cardId);
      });

      this._likeButton.addEventListener('click', () => {
         this._setLike();
      });

      this._elementImg.addEventListener('click', () => {
         this._handleCardClick(this._name, this._link);
      });
   }

   _isLiked() {
      return this._likes.some((like) => like._id === this._userId);
   }

   _checkRemoveCard() {
      if (this._ownerId !== this._userId) {
         this._deleteButton.classList.add("element__remove_invisible");
      } else {
         this._deleteButton.classList.remove("element__remove_invisible");
      }
   }

   _checkActiveLike() {
      if (this._isLiked()) {
         this._likeButton.classList.add("element__like-icon_active");
      } else {
         this._likeButton.classList.remove("element__like-icon_active");
      }
   }

   //метод для лайка карточки
   _setLike = () => {
      if (this._isLiked()) {
         this._handleRemoveLike(this._cardId);
      } else {
         this._handleLikeClick(this._cardId);
      }
   };

   like = (res) => {
      this._likes = res.likes;
      this._likesCounter.textContent = this._likes.length;
      this._likeButton.classList.toggle("element__like-icon_active");
   };

   //удалениe карточки
   removeElement = () => {
      this._element.remove();
      this._element = null;
   }
}