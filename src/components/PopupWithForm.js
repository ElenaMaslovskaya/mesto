import { Popup } from "./Popup.js"

//класс, который наследует от Popup и перезаписывает родительский метод close и setEventListeners
export class PopupWithForm extends Popup {
   constructor({ popupSelector, handleFormSubmit }) {
      super(popupSelector);
      this.handleFormSubmit = handleFormSubmit;
      this._element = popupSelector;
      this._form = this._element.querySelector('.popup__form');
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
      this._form.addEventListener("submit", (event) => {
         event.preventDefault();
         this.handleFormSubmit(this._getInputValues());
      });
   }

   // перезаписываем родительский метод close, при закрытии попапа форма должна сбрасываться
   close() {
      super.close();
      this._form.reset();
   }
}