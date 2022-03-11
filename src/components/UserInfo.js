export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
      userId: this._userId,
      userAvatar: this._userAvatar.src,
    };
  }

  setUserInfo(name, job, id, profileImageLink) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
    this._userId = id;
    this._userAvatar.src = profileImageLink;
  }
}
