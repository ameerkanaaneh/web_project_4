import { imagePopup, openPopup } from "./utils.js";

const popupImageElement = document.querySelector(".popup__card-image");

const popupNameElement = document.querySelector(".popup__name");
export default class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _handleImageClick(evt) {
    evt.preventDefault();
    this.handleCardClick(evt.target.src, this._name);
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleLikeClick(evt) {
    evt.preventDefault();
    evt.target.classList.toggle("element__like_active");
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", (evt) =>
      this._handleImageClick(evt)
    );

    this._deleteElement.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleDeleteClick();
    });

    this._likeElement.addEventListener("click", this._handleLikeClick);
  }

  getCard() {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(".element__image");
    this._nameElement = this._element
      .querySelector(".element__box")
      .querySelector(".element__name");
    this._deleteElement = this._element.querySelector(
      ".element__delete-button"
    );
    this._likeElement = this._element.querySelector(".element__like");

    this._setEventListeners();

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._nameElement.textContent = this._name;
    return this._element;
  }
}
