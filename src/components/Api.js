function serverResponse(res) {
   if (res.ok) {
      return res.json()
   }
   return Promise.reject(`Ошибка: ${res.status}`)
}
export class Api {
   constructor(params) {
      this._baseUrl = params.baseUrl;
      this._headers = params.headers;
   }

   //Ответ сервера
   _serverResponse(res) {
      if (res.ok) {
         return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
   }

   //Получить карточки
   getInitialCards() {
      console.log(this._baseUrl);
      return fetch(`${this._baseUrl}/cards`, {
         method: "GET",
         headers: this._headers,
      })
         .then((res) => {
            return this._serverResponse(res)
         });
   }

   //Получить данные пользователя
   getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
         headers: this._headers,
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
            about: data.about,
         })
      })
         .then((res) => {
            return this._serverResponse(res)
         });
   }

   //Добавить новую карточку
   addNewCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
            name: data.name,
            link: data.link,
         })
      })
         .then((res) => {
            return this._serverResponse(res)
         });
   }

   //Лайк карточки
   likeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
         method: "PUT",
         headers: this._headers,
      }).then((res) => {
         return this._serverResponse(res)
      });
   }

   //Дизлайк карточки
   dislikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
         method: "DELETE",
         headers: this._headers,
      }).then((res) => {
         return this._serverResponse(res)
      });
   }

   // Удалить карточку
   deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
         method: "DELETE",
         headers: this._headers,
      }).then((res) => {
         return this._serverResponse(res)
      });
   }

   // Обновить аватар
   updateAvatar(avatar) {
      return fetch(`${this._baseUrl}users/me/avatar`, {
         method: "PATCH",
         headers: this._headers,
         body: JSON.stringify({
            avatar: `${avatar}`,
         }),
      }).then((res) => {
         return this._serverResponse(res)
      });
   }
}