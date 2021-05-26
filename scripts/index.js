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

let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');

function formSubmitHandler (evt) {
	evt.preventDefault(); 

      nameInput = document.querySelector('#name').value;
      jobInput = document.querySelector('#job').value;

      document.querySelector('.profile__username').textContent = nameInput;
      document.querySelector('.profile__userjob').textContent = jobInput;
}


formElement.addEventListener('submit', formSubmitHandler);