import { Popup } from "./Popup.js"

//класс, который наследует от Popup и перезаписывает родительский метод close и setEventListeners
export class PopupWithForm extends Popup {
   constructor({ popupSelector, handleFormSubmit }) {
      super(popupSelector);
      this._element = popupSelector;
      this._form = this._element.querySelector('.popup__form');
      this._submitButton = this._form.querySelector('.popup__button');
      this._submitButtonDefault = this._submitButton.textContent;
      this._handleFormSubmit = handleFormSubmit;
   }

   //приватный метод, который собирает данные всех полей формы
   _getInputValues() {
      // достаём все элементы полей
      this._inputList = this._element.querySelectorAll('.popup__input');

      // создаём пустой объект
      this._formValues = {};

      // добавляем в этот объект значения всех полей
      this._inputList.forEach(input => {
         this._formValues[input.name] = input.value;
      });
      // возвращаем объект значений
      return this._formValues;
   }

   //Перезаписываем родительский метод setEventListeners
   setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (event) => {
         event.preventDefault();
         this._handleFormSubmit(this._getInputValues());
      });
   }

   // перезаписываем родительский метод close, при закрытии попапа форма должна сбрасываться
   close() {
      super.close();
      this._form.reset();
   }

   //"Сохранение..."" на кнопке вместо "Сохранить"
   renderLoading(isLoading) {
      if (isLoading) {
         this._submitButton.textContent = "Сохранение...";
      } else {
         this._submitButton.textContent = this._submitButtonDefault;
      }
   }
}