export class Api {
   constructor(config) {
      this._baseUrl = config.baseUrl;
      this._headers = config.headers;
   }

   //Ответ сервера
   _serverResponse(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res}`)
   }

   //Получить карточки
   getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers,
         })
         .then((res) => {
            return this._serverResponse(res)
         })
   }

   //Получить данные пользователя
   getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
         })
         .then((res) => {
            return this._serverResponse(res)
         });
   }

   //Обновить информацию о пользователе
   updateUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
               name: data.name,
               about: data.about
            })
         })
         .then((res) => {
            return this._serverResponse(res)
         })
   }

   //Добавить новую карточку
   addNewCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
               name: data.title,
               link: data.link
            })
         })
         .then((res) => {
            return this._serverResponse(res)
         })
   }

   //поставить лайк
   addLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
         method: 'PUT',
         headers: this._headers,
      })
      .then((res) => {
         return this._serverResponse(res)
      })
   }

   //снять лайк
   removeLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
         })
         .then((res) => {
            return this._serverResponse(res)
         })
   }

   // Удалить карточку
   deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
         method: 'DELETE',
         headers: this._headers,
      })
      .then((res) => {
         return this._serverResponse(res)
      })
   }

   // Обновить аватар
   updateAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            avatar: data.avatar
         })
      })
      .then((res) => {
         return this._serverResponse(res)
      })
   }
}