import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
   constructor(popupSelector) {
      super(popupSelector);
      this._form = document.querySelector('#delete-popup');
      this._submitBtnDelete = this._form.querySelector('#delete-button');
      this._submitBtnDeleteDefault = this._submitBtnDelete.textContent;
      this._submitConfirmationBind = this._submitConfirmation.bind(this);
   }

   setSubmitActions(action) {
      this._handlerActionsSubmit = action;
   }

   _submitConfirmation(event) {
      event.preventDefault();
      this._handlerActionsSubmit();
   }

   setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener("submit", this._submitConfirmationBind);
   }

   close = () => {
      super.close();
      this._form.removeEventListener("submit", this._submitConfirmationBind);
   }

   // отображение "Удаление..." на кнопке 
   toggleLoadingSubmit(isLoading) {
      if (isLoading) {
         this._submitBtnDelete.textContent = "Удаление...";
      } else {
         this._submitBtnDelete.textContent = this._submitBtnDeleteDefault;
      }
   }
}