let openPopup = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');


openPopup.addEventListener('click', openForm);

closePopup.addEventListener('click', closeForm);

function openForm() {
   let name = document.querySelector('.profile__username').textContent;
   nameInput.value = name;
   let job = document.querySelector('.profile__userjob').textContent;
   jobInput.value = job;
   popup.classList.toggle('popup_opened');
}

function closeForm() {
   popup.classList.toggle('popup_opened');
}

popup.addEventListener('click', function (event) {
   if (event.target === event.currentTarget) {
      closeForm();
   }
})

function formSubmitHandler (evt) {
	evt.preventDefault(); 

      nameInput = document.querySelector('#name').value;
      jobInput = document.querySelector('#job').value;

      document.querySelector('.profile__username').textContent = nameInput;
      document.querySelector('.profile__userjob').textContent = jobInput;
}


formElement.addEventListener('submit', formSubmitHandler);