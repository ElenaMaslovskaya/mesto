
function serverResponse(res) {
   if (res.ok) {
      return res.json()
   }
   return Promise.reject(`Ошибка: ${res.status}`)
}

export class Api {
   constructor(baseUrl, headers) {
      this._baseUrl = baseUrl;
      this._headers = headers;
   }

   getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
         headers: this._headers,
      })
         .then(serverResponse)
   }

   // другие методы работы с API
}