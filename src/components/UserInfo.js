export class UserInfo {
   constructor({ userSelector, infoSelector }) {
      this._userName = userSelector;
      this._userJob = infoSelector;
   }

   //публичный метод, который возвращает объект с данными пользователя
   getUserInfo() {
      return {
         nameInfo: this._userName.textContent,
         jobInfo: this._userJob.textContent,
      }
   }

   //публичный метод, который принимает новые данные пользователя и добавляет их на страницу
   setUserInfo(nameInfo, jobInfo) {
      this._userName.textContent = nameInfo;
      this._userJob.textContent = jobInfo;
   }
}