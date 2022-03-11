export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    userId
  ) {
    this._owner = owner;
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleHeartClick = handleLikeClick;
    this._cardId = _id;
    this._userId = userId;
    this._likes = likes;
    this._likesNum = likes ? likes.length : 0;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _handleImageClick(evt) {
    evt.preventDefault();
    this._handleCardClick(evt.target.src, this._name);
  }

  _handleDeleteIconClick(element) {
    this._handleDeleteClick(element, this._cardId);
  }

  _handleLikeClick(evt) {
    evt.preventDefault();
    this._handleHeartClick(
      this._cardId,
      evt.target.classList.contains("element__like_active"),
      this._updateCard.bind(this)
    );
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", (evt) =>
      this._handleImageClick(evt)
    );

    this._deleteElement.addEventListener("click", (evt) => {
      evt.preventDefault();

      this._handleDeleteIconClick(this._deleteElement.closest(".element"));
    });
    this._likes.forEach((element) => {
      if (element._id === this._userId) {
        this._likeElement.classList.add("element__like_active");
      }
    });

    this._likeElement.addEventListener("click", (evt) =>
      this._handleLikeClick(evt)
    );
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
    this._likesNumElement = this._element.querySelector(".element__count");

    if (this._userId === this._owner._id) {
      this._deleteElement.style.visibility = "visible";
    }
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._nameElement.textContent = this._name;
    this._likesNumElement.textContent = this._likesNum;
    this._setEventListeners();
    return this._element;
  }
  _updateCard(likeNum) {
    this._likesNum = likeNum;
    this._likeElement.classList.toggle("element__like_active");
    this._likesNumElement.textContent = this._likesNum;
  }
}
