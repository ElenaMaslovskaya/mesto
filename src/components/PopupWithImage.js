import { Popup } from "./Popup.js"

//класс, который наследует от Popup и перезаписывает родительский метод open
export class PopupWithImage extends Popup {
   constructor(popupElement) {
      super(popupElement); //вызываем конструктор родительского класса с единственным аргументом
      this._link = this._popup.querySelector('.popup__image');
      this._name = this._popup.querySelector('.popup__caption');
   }

   open(name, link) {
      super.open(); // вызываем родительский метод
      this._link.src = link; // ссылка на картинку
      this._name.textContent = name; // подпись к картинке
      this._link.alt = name; // alt к картинке 
   }
}