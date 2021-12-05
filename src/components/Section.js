export class Section {
   constructor({
      renderer
   }, containerElement) {
      this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице
      this._container = containerElement; //элемент контейнера, в который нужно добавлять созданные элементы.
   }

   //публичный метод, который отвечает за отрисовку всех элементов
   renderItems(items) {
      items.forEach(item => {
         this._renderer(item);
      });
   }

   //публичный метод, который принимает DOM-элемент и добавляет его в контейнер
   addItem(element) {
      this._container.append(element);
   }

   //публичный метод, который добавляет карточку в контейнер
   addNewItem(element) {
      this._container.prepend(element);
   }
}