export default class UserInfo {
  constructor(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    return { userName: this._userName, userJob: this._userJob };
  }

  setUserInfo(name, job) {
    this._userName = name;
    this._userJob = job;
  }
}
