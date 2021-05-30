let userName = document.querySelector('.profile__username');
let userJob = document.querySelector('.profile__userjob');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupForm = document.querySelector('.popup__form');
let popupName = document.querySelector('#name');
let popupJob = document.querySelector('#job');

popupOpenButton.addEventListener('click', openForm);
popupCloseButton.addEventListener('click', closeForm);
popupForm.addEventListener('submit', formSubmitHandler);
popup.addEventListener('click', closeButtonClick);

function openForm() {
popupName.value = userName.textContent;
popupJob.value = userJob.textContent;
popup.classList.toggle('popup_opened');
}

function closeForm() {
popup.classList.toggle('popup_opened');
}

function formSubmitHandler (event) {
event.preventDefault();
document.querySelector('.profile__username').textContent = popupName.value;
document.querySelector('.profile__userjob').textContent = popupJob.value;
popup.classList.toggle('popup_opened');
}

function closeButtonClick(event) {
if (event.target === event.currentTarget) {
closeForm();
}
}