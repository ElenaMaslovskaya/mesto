import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
   constructor(popupSelector) {
      super(popupSelector);
      this._popup = document.querySelector('#delete-popup');
      this._submitButton = this._popup.querySelector('#delete-button');
      this._submitButtonDefault = this._submitButton.textContent;
   }

   setEventListeners() {
      super.setEventListeners();
      this._submitButton.addEventListener('submit', (event) => {
         event.preventDefault();
         this.handleFormSubmit();
      })
   }

   // отображение "Удаление..." на кнопке 
   renderLoading(isLoading) {
      if (isLoading) {
         this._submitButton.textContent = "Удаление...";
      } else {
         this._submitButton.textContent = this._submitButtonDefault;
      }
   }
}