class FormValidator {
   constructor(config, formElement) {
      this._formElement = formElement;
      this._config = config;
      this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
      this._submitButton = formElement.querySelector(config.submitButtonSelector);
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
   _toggleButtonState = () => {
      const isFormValid = this._formElement.checkValidity();
      if (isFormValid) {
         this._submitButton.classList.remove(this._config.inactiveButtonClass);
         this._submitButton.disabled = false;
      } else {
         this._submitButton.classList.add(this._config.inactiveButtonClass);
         this._submitButton.disabled = "disabled";
      }
   }

   //слушатели событий
   _setEventListeners = () => {
      const isFormValid = this._formElement.checkValidity();
      this._toggleButtonState(isFormValid);
      Array.from(this._inputList).forEach((inputElement) => {

         inputElement.addEventListener('input', () => {
            const isFormValid = this._formElement.checkValidity();

            this._checkInputValidity(inputElement);
            this._toggleButtonState(isFormValid);
         });
      });

      this._formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
         this._toggleButtonState(false);
      });
   }

   //очистка ошибок
   resetValidation() {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {

         const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
         this._hideError(inputElement, errorElement);
      });
   }

   //включить валидацию
   enableValidation() {
      const forms = this._formElement;
      this._setEventListeners(forms, this._config);
   }

}

export { FormValidator };