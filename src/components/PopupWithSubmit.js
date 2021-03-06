import {
   Popup
} from "./Popup.js";

export class PopupWithSubmit extends Popup {
   constructor(popupElement) {
      super(popupElement);
      this._submitButton = this._popup.querySelector('#delete-button');
      this._submitButtonDefault = this._submitButton.textContent;
      this._submitDeleteBind = this._submitDelete.bind(this)
   }

   setSubmitActions(handler) {
      this._handleFormSubmit = handler
   }

   _submitDelete(event) {
      event.preventDefault();
      this._handleFormSubmit();
   }

   setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener('submit', this._submitDeleteBind)
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