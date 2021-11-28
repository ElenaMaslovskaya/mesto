export class UserInfo {
   constructor({ userSelector, infoSelector, avatarSelector }) {
      this._userName = userSelector;
      this._userJob = infoSelector;
      this._userAvatar = avatarSelector;
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
   setUserInfo({ name, about }) {
      this._userName.textContent = name;
      this._userJob.textContent = about;
   }

   setUserAvatar(data) {
      this._userAvatar.src = data.avatar;
   }
}