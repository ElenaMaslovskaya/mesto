let openPopup = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__close');

openPopup.addEventListener('click', toggleClass);

closePopup.addEventListener('click', toggleClass);

function toggleClass() {
   popup.classList.toggle('popup_opened');
}

popup.addEventListener('click', function (event) {
   if (event.target === event.currentTarget) {
      toggleClass()
   }
})

let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()

function formSubmitHandler (evt) {
	evt.preventDefault(); 

	let nameInput = document.querySelector('#name');// Воспользуйтесь инструментом .querySelector()
	let jobInput = document.querySelector('#job'); // Воспользуйтесь инструментом .querySelector()

	// Получите значение полей из свойства value
      nameInput = document.querySelector('#name').value;
      console.log(nameInput);
      jobInput = document.querySelector('#job').value;
	// Выберите элементы, куда должны быть вставлены значения полей
      document.querySelector('.profile__info_user-name').textContent = nameInput;
      document.querySelector('.profile__info_user-job').textContent = jobInput;
	// Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);