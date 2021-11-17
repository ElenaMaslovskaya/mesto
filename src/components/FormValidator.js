class FormValidator {
   constructor(config, formElement) {
      this._formElement = formElement;
      this._config = config;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
      this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
   }

   //показать ошибку
   _showError = (errorElement, inputElement) => {
      errorElement.textContent = inputElement.validationMessage;
      inputElement.classList.add(this._config.inputErrorClass);
   }

   //скрыть ошибку
   _hideError = (errorElement, inputElement) => {
      errorElement.textContent = "";
      inputElement.classList.remove(this._config.inputErrorClass);
   }

   //проверка на ошибку
   _checkInputValidity = (inputElement) => {

      const isInputNotValid = !inputElement.validity.valid;
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

      if (isInputNotValid) {
         this._showError(errorElement, inputElement);
      } else {
         this._hideError(errorElement, inputElement);
      }
   }

   //переключение кнопки в активное или неактивное состояние
   toggleButtonState = () => {
      const isFormValid = this._formElement.checkValidity();
      if (isFormValid) {
         this._submitButton.classList.remove(this._config.inactiveButtonClass);
         this._submitButton.disabled = false;
      } else {
         this._submitButton.classList.add(this._config.inactiveButtonClass);
         this._submitButton.disabled = true;
      }
   }

   //слушатели событий

   _setEventListeners = () => {
      this._inputList.forEach(inputElement => {
         inputElement.addEventListener("input", () => {
            this._checkInputValidity(inputElement);
            this.toggleButtonState();
         });
      });
   }

   //очистка ошибок
   resetValidation() {
      this.toggleButtonState();
      this._inputList.forEach(inputElement => {

         const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
         this._hideError(inputElement, errorElement);
      });
   }

   //включить валидацию
   enableValidation() {
      this._setEventListeners();
   }

}

export { FormValidator };