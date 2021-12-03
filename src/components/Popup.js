export class Popup {
   constructor(popupSelektor) {
      this._popup = popupSelektor; //селектор попапа
      this._handleEscClose = this._handleEscClose.bind(this); //явная привязка
      this._overlayClosePopup = this._overlayClosePopup.bind(this); //явная привязка
   }

   _handleEscClose(event) {
      if (event.key === "Escape") {
         this.close();
      }
   }

   //закрытие попапов кликом на оверлей
   _overlayClosePopup(event) {
      if (event.target === event.currentTarget) {
         this.close();
      }
   }

   //метод, добавляющий слушатель клика на иконку закрытия попапа и на оверлей
   setEventListeners() {
      this._popup.querySelector('.popup__close').addEventListener("click", () => this.close());
      this._popup.addEventListener('click', (event) => this._overlayClosePopup(event));
   }

   //публичный медод, отвечающий за открытие попапа
   open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener("keydown", this._handleEscClose)
   }

   //публичный метод, отвечающий за закрытие попапа
   close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
   }
}