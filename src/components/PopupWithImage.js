import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageElement = this._popup.querySelector(".popup__card-image");
    this._popupNameElement = this._popup.querySelector(".popup__name");
  }

  closePopup() {
    super.closePopup();
  }

  openPopup(src, name) {
    super.openPopup();
    this._addImageAndCaption(src, name);
  }

  _addImageAndCaption(src, name) {
    this._popupImageElement.src = src;
    this._popupImageElement.alt = name;
    this._popupNameElement.textContent = name;
  }
}

export default PopupWithImage;
