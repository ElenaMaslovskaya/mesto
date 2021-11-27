export class Card {
   constructor( { data, userId, handleCardClick, handle}, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this.handleCardClick = handleCardClick;
   }

   _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

      return cardElement;
   }

   generateCard() {
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
         this.handleCardClick();
      });
   }

   //функция удаления карточки
   _removeElement() {
      this._element.remove();
      this._element = null;
   }

   //Лайк поставить/удалить
   _likeElement() {
      this._element.querySelector('.element__like-icon').classList.toggle('element__like-icon_active');
   }
}
