export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  };

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.removeEventListener("click", this._handleOverlayClick);
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("click", this._handleOverlayClick);
  }

  _handleOverlayClick = (evt) => {
    if (evt.target.classList.contains("popup")) {
      this.closePopup();
    }
  };

  _addCloseOnClickEvent() {
    this._closeBtn = this._popup.querySelector(".popup__close");
    this._closeBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.closePopup();
    });
  }

  setEventListeners() {
    this._addCloseOnClickEvent();
  }
}
