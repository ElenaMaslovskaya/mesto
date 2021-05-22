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

let formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
	evt.preventDefault(); 

	let nameInput = document.querySelector('#name');
	let jobInput = document.querySelector('#job');

      nameInput = document.querySelector('#name').value;
      jobInput = document.querySelector('#job').value;

      document.querySelector('.profile__info_user-name').textContent = nameInput;
      document.querySelector('.profile__info_user-job').textContent = jobInput;
}

formElement.addEventListener('submit', formSubmitHandler);