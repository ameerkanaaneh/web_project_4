import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openPopup(src, name) {
    super.openPopup();
    this._addImageAndCaption(src, name);
  }

  _addImageAndCaption(src, name) {
    this._popupImageElement = document.querySelector(".popup__card-image");
    this._popupNameElement = document.querySelector(".popup__name");
    this._popupImageElement.src = src;
    this._popupImageElement.alt = name;
    this._popupNameElement.textContent = name;
  }
}
