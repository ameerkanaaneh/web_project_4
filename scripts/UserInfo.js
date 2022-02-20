class UserInfo {
  constructor({ userName, UserJob }) {
    this._userName = userName;
    this._UserJob = UserJob;
  }

  getUserInfo() {
    return { userName: this._userName, UserJob: this._UserJob };
  }

  setUserInfo({ name, job }) {
    this._userName = name;
    this._job = job;
  }
}
