export class UserInfo {
   constructor({
      userElement,
      infoElement,
      avatarElement
   }) {
      this._userName = userElement;
      this._userJob = infoElement;
      this._userAvatar = avatarElement;
   }

   //публичный метод, который возвращает объект с данными пользователя
   getUserInfo() {
      return {
         name: this._userName.textContent,
         about: this._userJob.textContent,
         avatar: this._userAvatar.src
      }
   }

   //публичный метод, который принимает новые данные пользователя и добавляет их на страницу
   setUserInfo(data) {
      this._userName.textContent = data.name;
      this._userJob.textContent = data.about;
   }

   setUserAvatar(data) {
      this._userAvatar.src = data.avatar;
   }
}